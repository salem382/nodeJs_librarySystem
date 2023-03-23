import UserModel from "../models/userModel";
import  {AppError, catchError} from '../utils/ApiError';
import {generateToken, hashPassword, verifyPassword} from '../utils/baseFunction';
import emailService from "./email"
import {Request, Response, NextFunction} from 'express'
import  jwt  from "jsonwebtoken";


interface AuthenticatedRequest extends Request {
    user_id: string;
}

abstract class User {

    signUp(req:Request, res:Response, next:NextFunction):void{
        catchError(async (req:Request, res:Response, next:NextFunction) => {

            const {name, email, password} = req.body;
            const user = await UserModel.findOne({email});
            if (user) return next(new AppError('use another email',409));
            emailService.sendEmail({email});
            await UserModel.insertMany({name, email, password:hashPassword(password)});
            return res.json({message:"success"});
        })(req, res, next);
    }

    login(req:Request, res:Response, next:NextFunction):void {
        catchError(async (req:Request, res:Response, next:NextFunction) => {

            const {email, password} = req.body;
            const user = await UserModel.findOne({email});
            if (!user || !(await verifyPassword(password, user?.password)))
                return next(new AppError('incorect email or password',401));
            if(!user.confirmEmail) 
                return next(new AppError('confirm your email',403));
            const token = generateToken({id:user._id,email:user.email ,name:user.name, role:user.role, status:user.status}); 
            return res.json({message:"success", token});

        })(req, res, next);
    }

    getEmailForForgetPassword (req:Request, res:Response, next:NextFunction) {
        catchError(async (req:Request, res:Response, next:NextFunction) => { 

            const {email} = req.body;
            const user = await UserModel.findOne({email});
            if (!user) return next(new AppError('user not found', 404));
            emailService.sendEmail({email}, false);
            return res.json({message:"success"});
        })(req, res, next);
    }

    forgotPassword(req:Request, res:Response, next:NextFunction):void {
        catchError(async (req:Request, res:Response, next:NextFunction) => { 

            const {email, newPassword, code} = req.body;
            const user = await UserModel.findOne({email});
            if (!user) return next(new AppError('user not found', 404));
            if (code != user.verifyCode) return next(new AppError('worng code', 401));
            await UserModel.findOneAndUpdate({email}, {password:hashPassword(newPassword)});
            return res.json({message:"success"});

        })(req, res, next);
    }

    async changePassword(req:AuthenticatedRequest, res:Response, next:NextFunction): Promise<void> {
        catchError(async (req:AuthenticatedRequest, res:Response, next:NextFunction) => { 

            const {newPassword} = req.body;
            await UserModel.findByIdAndUpdate(req.user_id, {password:hashPassword(newPassword)});
            return res.json({message:"success"});
         })(req, res, next);
    }
    verifyEmail (req:Request, res:Response, next:NextFunction):void {
        const {token} = req.params;

        jwt.verify(token, 'myNameIsUser', async (err:any, decode:any) => {

            if (err) return next(new AppError(err.message, 401));
            await UserModel.findOneAndUpdate({email : decode.email}, {confirmEmail: true});
            return res.json({message:"success"});
        });
    }
 
}


export default User;
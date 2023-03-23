import UserModel from "../models/userModel";
import { catchError} from "../utils/ApiError";
import User from "./user";


class Customer extends User {

    async deleteProfile(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            await UserModel.findByIdAndDelete(req.user_id);
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async softDelete(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {
           
            await UserModel.findOneAndUpdate({_id:req.user_id}, {status:'notactive'})
           return res.json({message:"success"});
        })(req, res, next);
    }
}


export const customer:Customer = new Customer(); 
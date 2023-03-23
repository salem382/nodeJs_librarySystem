import  jwt from "jsonwebtoken";
import { AppError } from "../utils/ApiError";


export const verifyUser = (req:any, res:any, next:any):void => {

    const token = req.header('token');

    jwt.verify(token!, 'myNameIsUser', (err:any, decode:any) => {
        
        if (err) return next(new AppError(err.message, 401));
        req.user_id = decode.id;
        next();
    });
}

import  jwt from "jsonwebtoken";
import { AppError } from "../utils/ApiError";


export const verifyAdmin = (req:any, res:any, next:any):void => {

    const token = req.header('token');

    jwt.verify(token!, 'myNameIsUser', (err:any, decode:any) => {
        
        if (err) return next(new AppError(err.message, 401));
        if (decode.role != 'admin') return next(new AppError('you shouid be a admin to do this',401));
        req.user_id = decode.id;
        next();
    });
}

import  jwt from "jsonwebtoken";
import bookModel from "../models/bookModel";
import { AppError } from "../utils/ApiError";


export const isBuying = (req:any, res:any, next:any):void=> {

    const token = req.header('token');
    const {bookId} = req.body;

    jwt.verify(token!, 'myNameIsUser',async (err:any, decode:any) => {
        
        if (err) return next(new AppError(err.message, 401));
        const book = await bookModel.find({_id: bookId, buyingIds: { $in: [decode._id] } });
        if (!book) return next(new AppError('you shouid buy the book to add feedback',404));
        next();
    });
}

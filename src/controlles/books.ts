import { AppError, catchError } from "../utils/ApiError";
import bookModel from "../models/bookModel";

class Book {

    async getAllBooks(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {
             
          const books = await bookModel.find().populate('buyingIds');
          return res.json({message:"success", books});
        })(req, res, next);   
    }
    async addBook(req:any, res:any, next:any):Promise<void>  {
      catchError(async (req:any, res:any, next:any) => {
        
        const {name, desc, price, category} =  req.body;
        await bookModel.insertMany({name, desc, price,category,
          poster:req.files.image[0].filename, pdf :req.files.pdf[0].filename});
        return res.json({message:"success"});
        
      })(req, res, next);   
     }
     async updateBook(req:any, res:any, next:any):Promise<void>  {
      catchError(async (req:any, res:any, next:any) => {
        
        const {_id ,name, desc, price, category} = req.body;
        const book = await bookModel.findByIdAndUpdate(_id,{name, desc, price, category}, {new:true});
        if (!book) return next(new AppError('this book not found', 404));
        return res.json({message:"success"});
        
      })(req, res, next);   
     }
     async deleteBook(req:any, res:any, next:any):Promise<void>  {
      catchError(async (req:any, res:any, next:any) => {
        
        const {_id} = req.body;
        const book = await bookModel.findByIdAndDelete(_id, {new:true});
        if (!book) return next(new AppError('this book not found', 404));
        return res.json({message:"success"});
        
      })(req, res, next);   
     }
    
    async buyBook(req:any, res:any, next:any):Promise<void>  {
      catchError(async (req:any, res:any, next:any) => {

        const {book_id} = req.body;
        await bookModel.findByIdAndUpdate(book_id,{$push: {buyingIds:[req.user_id]}  });
        return res.json({message:"success"});
    })(req, res, next);   
  }

}

const books:Book = new Book;

export default books;
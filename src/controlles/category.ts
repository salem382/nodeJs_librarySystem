import { AppError, catchError } from "../utils/ApiError";
import categoryModel from "../models/categoryModel";


class Category {
 
    async addCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {name} = req.body;
            await categoryModel.insertMany({name});
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async updateCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {_id, name} = req.body;
            const cat = await categoryModel.findByIdAndUpdate(_id, {name}, {new:true});
            if (!cat) return next(new AppError('category not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async deleteCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {_id} = req.body;
            const cat = await categoryModel.findByIdAndDelete(_id, {new:true});
            if (!cat) return next(new AppError('category not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async getAllCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const categorys = await categoryModel.find().populate('books')
            return res.json({message:"success",categorys});
        })(req, res, next);   
    }
}

const category:Category = new Category();

export default category;
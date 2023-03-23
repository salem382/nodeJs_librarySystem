import bookModel from "../models/bookModel";
import feedbackModel from "../models/feedBackMode";
import { AppError, catchError } from "../utils/ApiError";



class Feedback {

    async addFeedback(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {
            
        const {rate, comment, bookId} = req.body;
        await feedbackModel.insertMany({comment, rate, bookId, userId:req.user_id});
        let feedbacks = await feedbackModel.find({bookId});
        let sum = 0;
        feedbacks.forEach(feedback => {
            sum+=feedback.rate;
        })
        await bookModel.findByIdAndUpdate(bookId, {rate:sum / feedbacks.length});
        return res.json({message:"success"}); 
    })(req, res, next);   
    }
    async deleteFeedback(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {
            
        const {feedback_id} = req.body;
        const feedback = await feedbackModel.findOneAndDelete({_id:feedback_id, userId:req.user_id}, {new:true});
        if (!feedback) return next(new AppError('not found', 404));
        return res.json({message:"success"}); 
    })(req, res, next);   
    }
    async updateFeedback(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {
            
        const {feedback_id, rate, comment} = req.body;
        const feedback = await feedbackModel.findByIdAndUpdate({_id:feedback_id, userId:req.user_id},{rate, comment},{new:true});
        if (!feedback) return next(new AppError('not found', 404));
        return res.json({message:"success"}); 
    })(req, res, next);   
    }

    async getFeedback(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {
            
        const {bookId} = req.body;
        const feedback = await feedbackModel.findOne({bookId, userId:req.user_id});
        if (!feedback) return next(new AppError('not found', 404));
        return res.json({message:"success", feedback}); 
    })(req, res, next);   
    }
}

const feedback:Feedback = new Feedback();
export default feedback;
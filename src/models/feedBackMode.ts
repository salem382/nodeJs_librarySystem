
import mongoose, { Document, Model, Schema } from 'mongoose';

interface feedback extends Document {
    userId: object;
    bookId: object;
    rate:number;
    comment:String;

}

const feedbackSchema: Schema<feedback> = new mongoose.Schema({

    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    bookId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Book'
    },
    rate:{
        type:Number,
        required:true,
        minlength:[0, 'rate can not be less than 0'],
        maxlength:[5, 'rate can not be more than 5']
    },
    comment:{
        type:String,
        required:true
    }
});


const feedbackModel: Model<feedback> = mongoose.model<feedback>('Feedback', feedbackSchema);

export default feedbackModel;

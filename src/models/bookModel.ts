
import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface Book extends Document {
  name: string;
  desc: string;
  price:number;
  rate:number;
  category: Schema.Types.ObjectId;
  poster:string;
  pdf:string;
  buyingIds:Array<Schema.Types.ObjectId>;
}

const bookSchema: Schema<Book> = new mongoose.Schema({

    name:{
        type:String,
        min:[3,'must be greater than three digit'],
        max:[25, 'not allow to be more than 25 digit'],
        required:true
    },
    desc:{
        type:String,
        min:[3,'must be greater than three digit'],
        max:[50, 'not allow to be more than 50 digit'],
        required:true
    },
    price:{
        type:Number,
        minlength:[1,'the price must be greater than one egp'],
        maxlength:[1000000, 'the price not allow to be more than 1000000 egp'],
        required:true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref:'category',
        min:[3,'must be greater than three digit'],
        max:[50, 'not allow to be more than 50 digit'],
        required:true
    },
    poster:{
        type:String,
        required:true
    },
    pdf:{
        type:String,
        required:true
    },
    buyingIds:[{type:Schema.Types.ObjectId, ref:'user'}],
});


const bookModel: Model<Book> = mongoose.model<Book>('Book', bookSchema);

export default bookModel;

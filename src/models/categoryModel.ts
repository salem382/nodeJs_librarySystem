
import mongoose, { Document, Model, Mongoose, Schema } from 'mongoose';

interface category extends Document {
  name: string;
}

const categorySchema: Schema<category> = new mongoose.Schema({

    name:{
        type:String,
        min:[3,'must be greater than three digit'],
        max:[25, 'mesage from name'],
        required:true
    }
});


const categoryModel: Model<category> = mongoose.model<category>('Category', categorySchema);

export default categoryModel;

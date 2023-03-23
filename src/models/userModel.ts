
import mongoose, { Document, Model, Schema } from 'mongoose';

enum UserStatus {
  Active = 'active',
  NotActive = 'notactive'
}
enum roleStatus {
  customer = 'customer',
  admin = 'admin'
}

interface User extends Document {
  name: string;
  email:String;
  password:String;
  confirmEmail:Boolean;
  createdAt:Date;
  status:UserStatus; 
  role:roleStatus;
  verifyCode:string;
}

const userSchema: Schema<User> = new mongoose.Schema({
  name: {
    type:String,minlength:[3, "error in name length"],maxlength:[25, "error in name length"]},
  email: {
    type:String,minlength:3,maxlength:30
  },
  password: {type:String,minlength:[1, 'error in length'],maxlength:[200, 'error in length'],},
  confirmEmail : {type:Boolean,default:false},
  createdAt: {type: Date,default: Date.now},
  status: {type: String,enum: Object.values(UserStatus),default: UserStatus.Active },
  role: {type: String, enum: Object.values(roleStatus),default: roleStatus.customer},
  verifyCode : {type:String,default:"dfadfh52dfh"},
});



const UserModel: Model<User> = mongoose.model<User>('User', userSchema);

export default UserModel;

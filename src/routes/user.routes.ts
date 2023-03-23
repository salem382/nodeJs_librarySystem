import  express  from "express";
import validation from "../middlewares/validation";
import {customer} from '../controlles/customer';
import { signUpValidation } from "../validations/signup.validation";
import { logInValidation } from "../validations/signin.validation";
import { verifyUser } from "../middlewares/verifyUser";
import { verifyCustomer } from "../middlewares/verifyCustomer";


const userRouter = express.Router();

userRouter.post('/signup',validation(signUpValidation) ,customer.signUp);
userRouter.post('/login',validation(logInValidation)  ,customer.login);
userRouter.post('/sendEmail', customer.getEmailForForgetPassword);
userRouter.post('/forgotpassword', customer.forgotPassword);
userRouter.delete('/',verifyUser,customer.deleteProfile);
userRouter.delete('/soft', verifyCustomer,customer.softDelete);
userRouter.get('/:token',verifyUser, customer.verifyEmail);


export default userRouter;
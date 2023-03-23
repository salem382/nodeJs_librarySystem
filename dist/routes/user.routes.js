"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = __importDefault(require("../middlewares/validation"));
const customer_1 = require("../controlles/customer");
const signup_validation_1 = require("../validations/signup.validation");
const signin_validation_1 = require("../validations/signin.validation");
const verifyUser_1 = require("../middlewares/verifyUser");
const verifyCustomer_1 = require("../middlewares/verifyCustomer");
const userRouter = express_1.default.Router();
userRouter.post('/signup', (0, validation_1.default)(signup_validation_1.signUpValidation), customer_1.customer.signUp);
userRouter.post('/login', (0, validation_1.default)(signin_validation_1.logInValidation), customer_1.customer.login);
userRouter.post('/sendEmail', customer_1.customer.getEmailForForgetPassword);
userRouter.post('/forgotpassword', customer_1.customer.forgotPassword);
userRouter.delete('/', verifyUser_1.verifyUser, customer_1.customer.deleteProfile);
userRouter.delete('/soft', verifyCustomer_1.verifyCustomer, customer_1.customer.softDelete);
userRouter.get('/:token', verifyUser_1.verifyUser, customer_1.customer.verifyEmail);
exports.default = userRouter;
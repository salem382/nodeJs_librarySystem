"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const ApiError_1 = require("../utils/ApiError");
const baseFunction_1 = require("../utils/baseFunction");
const email_1 = __importDefault(require("./email"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class User {
    signUp(req, res, next) {
        (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const user = yield userModel_1.default.findOne({ email });
            if (user)
                return next(new ApiError_1.AppError('use another email', 409));
            email_1.default.sendEmail({ email });
            yield userModel_1.default.insertMany({ name, email, password: (0, baseFunction_1.hashPassword)(password) });
            return res.json({ message: "success" });
        }))(req, res, next);
    }
    login(req, res, next) {
        (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield userModel_1.default.findOne({ email });
            if (!user || !(yield (0, baseFunction_1.verifyPassword)(password, user === null || user === void 0 ? void 0 : user.password)))
                return next(new ApiError_1.AppError('incorect email or password', 401));
            if (!user.confirmEmail)
                return next(new ApiError_1.AppError('confirm your email', 403));
            const token = (0, baseFunction_1.generateToken)({ id: user._id, email: user.email, name: user.name, role: user.role, status: user.status });
            return res.json({ message: "success", token });
        }))(req, res, next);
    }
    getEmailForForgetPassword(req, res, next) {
        (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield userModel_1.default.findOne({ email });
            if (!user)
                return next(new ApiError_1.AppError('user not found', 404));
            email_1.default.sendEmail({ email }, false);
            return res.json({ message: "success" });
        }))(req, res, next);
    }
    forgotPassword(req, res, next) {
        (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, newPassword, code } = req.body;
            const user = yield userModel_1.default.findOne({ email });
            if (!user)
                return next(new ApiError_1.AppError('user not found', 404));
            if (code != user.verifyCode)
                return next(new ApiError_1.AppError('worng code', 401));
            yield userModel_1.default.findOneAndUpdate({ email }, { password: (0, baseFunction_1.hashPassword)(newPassword) });
            return res.json({ message: "success" });
        }))(req, res, next);
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { newPassword } = req.body;
                yield userModel_1.default.findByIdAndUpdate(req.user_id, { password: (0, baseFunction_1.hashPassword)(newPassword) });
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    verifyEmail(req, res, next) {
        const { token } = req.params;
        jsonwebtoken_1.default.verify(token, 'myNameIsUser', (err, decode) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                return next(new ApiError_1.AppError(err.message, 401));
            yield userModel_1.default.findOneAndUpdate({ email: decode.email }, { confirmEmail: true });
            return res.json({ message: "success" });
        }));
    }
}
exports.default = User;

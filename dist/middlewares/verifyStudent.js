"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyStudent = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const verifyStudent = (req, res, next) => {
    const token = req.header('token');
    jsonwebtoken_1.default.verify(token, 'myNameIsUser', (err, decode) => {
        req.user_id = decode.id;
        if (!decode.isLogin)
            return next(new ApiError_1.AppError("login first", 401));
        next();
    });
};
exports.verifyStudent = verifyStudent;

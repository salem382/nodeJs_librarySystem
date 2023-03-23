"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const verifyAdmin = (req, res, next) => {
    const token = req.header('token');
    jsonwebtoken_1.default.verify(token, 'myNameIsUser', (err, decode) => {
        if (err)
            return next(new ApiError_1.AppError(err.message, 401));
        if (decode.role != 'admin')
            return next(new ApiError_1.AppError('you shouid be a admin to do this', 401));
        req.user_id = decode.id;
        next();
    });
};
exports.verifyAdmin = verifyAdmin;

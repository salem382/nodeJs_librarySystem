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
exports.logoutMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const ApiError_1 = require("../utils/ApiError");
const logoutMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('token');
    jsonwebtoken_1.default.verify(token, 'myNameIsUser', (err, decode) => {
        if (err)
            return next(new ApiError_1.AppError(err.message, 500));
        yield userModel_1.default;
        next();
    });
});
exports.logoutMiddleware = logoutMiddleware;
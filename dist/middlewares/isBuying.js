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
exports.isBuying = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bookModel_1 = __importDefault(require("../models/bookModel"));
const ApiError_1 = require("../utils/ApiError");
const isBuying = (req, res, next) => {
    const token = req.header('token');
    const { bookId } = req.body;
    jsonwebtoken_1.default.verify(token, 'myNameIsUser', (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return next(new ApiError_1.AppError(err.message, 401));
        const book = yield bookModel_1.default.find({ _id: bookId, buyingIds: { $in: [decode._id] } });
        if (!book)
            return next(new ApiError_1.AppError('you shouid buy the book to add feedback', 404));
        next();
    }));
};
exports.isBuying = isBuying;

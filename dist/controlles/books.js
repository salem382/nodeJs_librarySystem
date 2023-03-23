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
const ApiError_1 = require("../utils/ApiError");
const bookModel_1 = __importDefault(require("../models/bookModel"));
class Book {
    getAllBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const books = yield bookModel_1.default.find().populate('buyingIds');
                return res.json({ message: "success", books });
            }))(req, res, next);
        });
    }
    addBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { name, desc, price, category } = req.body;
                yield bookModel_1.default.insertMany({ name, desc, price, category,
                    poster: req.files.image[0].filename, pdf: req.files.pdf[0].filename });
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    updateBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { _id, name, desc, price, category } = req.body;
                const book = yield bookModel_1.default.findByIdAndUpdate(_id, { name, desc, price, category }, { new: true });
                if (!book)
                    return next(new ApiError_1.AppError('this book not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    deleteBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { _id } = req.body;
                const book = yield bookModel_1.default.findByIdAndDelete(_id, { new: true });
                if (!book)
                    return next(new ApiError_1.AppError('this book not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    buyBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { book_id } = req.body;
                yield bookModel_1.default.findByIdAndUpdate(book_id, { $push: { buyingIds: [req.user_id] } });
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
}
const books = new Book;
exports.default = books;

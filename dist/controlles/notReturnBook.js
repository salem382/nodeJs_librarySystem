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
class NotReturnedBook {
    search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { text } = req.body;
                const books = yield bookModel_1.default.find({ borrowedBy: req.user_id, returnedDate: { $gt: Date.now() }, name: new RegExp(`${text}`) });
                return res.json({ message: "success", books });
            }))(req, res, next);
        });
    }
    getAllBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                //     const books = await bookModel.find({ returnedDate: { $gt: Date.now() } });
                //     const nowDate = new Date();
                //     for (let i = 0; i < books.length; i++) {
                //         const diffInMs = books[i].returnedDate.getTime() - nowDate.getTime();
                //         const diffInDays = diffInMs / (24 * 60 * 60 * 1000); 
                //         books[i].fine = books[i].fine * diffInDays;
                //     }
                //   return res.json({message:"success",books});
            }))(req, res, next);
        });
    }
}
exports.default = NotReturnedBook;

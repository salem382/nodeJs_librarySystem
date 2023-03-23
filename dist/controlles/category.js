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
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
class Category {
    addCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { name } = req.body;
                yield categoryModel_1.default.insertMany({ name });
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    updateCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { _id, name } = req.body;
                const cat = yield categoryModel_1.default.findByIdAndUpdate(_id, { name }, { new: true });
                if (!cat)
                    return next(new ApiError_1.AppError('category not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { _id } = req.body;
                const cat = yield categoryModel_1.default.findByIdAndDelete(_id, { new: true });
                if (!cat)
                    return next(new ApiError_1.AppError('category not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    getAllCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const categorys = yield categoryModel_1.default.find().populate('books');
                return res.json({ message: "success", categorys });
            }))(req, res, next);
        });
    }
}
const category = new Category();
exports.default = category;

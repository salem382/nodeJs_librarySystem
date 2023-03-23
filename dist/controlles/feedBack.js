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
const bookModel_1 = __importDefault(require("../models/bookModel"));
const feedBackMode_1 = __importDefault(require("../models/feedBackMode"));
const ApiError_1 = require("../utils/ApiError");
class Feedback {
    addFeedback(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { rate, comment, bookId } = req.body;
                yield feedBackMode_1.default.insertMany({ comment, rate, bookId, userId: req.user_id });
                let feedbacks = yield feedBackMode_1.default.find({ bookId });
                let sum = 0;
                feedbacks.forEach(feedback => {
                    sum += feedback.rate;
                });
                yield bookModel_1.default.findByIdAndUpdate(bookId, { rate: sum / feedbacks.length });
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    deleteFeedback(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { feedback_id } = req.body;
                const feedback = yield feedBackMode_1.default.findOneAndDelete({ _id: feedback_id, userId: req.user_id }, { new: true });
                if (!feedback)
                    return next(new ApiError_1.AppError('not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    updateFeedback(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { feedback_id, rate, comment } = req.body;
                const feedback = yield feedBackMode_1.default.findByIdAndUpdate({ _id: feedback_id, userId: req.user_id }, { rate, comment }, { new: true });
                if (!feedback)
                    return next(new ApiError_1.AppError('not found', 404));
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    getFeedback(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const { bookId } = req.body;
                const feedback = yield feedBackMode_1.default.findOne({ bookId, userId: req.user_id });
                if (!feedback)
                    return next(new ApiError_1.AppError('not found', 404));
                return res.json({ message: "success", feedback });
            }))(req, res, next);
        });
    }
}
const feedback = new Feedback();
exports.default = feedback;

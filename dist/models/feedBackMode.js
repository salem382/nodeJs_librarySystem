"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const feedbackSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bookId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    rate: {
        type: Number,
        required: true,
        minlength: [0, 'rate can not be less than 0'],
        maxlength: [5, 'rate can not be more than 5']
    },
    comment: {
        type: String,
        required: true
    }
});
const feedbackModel = mongoose_1.default.model('Feedback', feedbackSchema);
exports.default = feedbackModel;

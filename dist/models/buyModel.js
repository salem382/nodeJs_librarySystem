"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const buySchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Book'
    }
});
const buyModel = mongoose_1.default.model('Buy', buySchema);
exports.default = buyModel;

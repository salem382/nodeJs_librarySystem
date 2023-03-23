"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        min: [3, 'must be greater than three digit'],
        max: [25, 'not allow to be more than 25 digit'],
        required: true
    },
    desc: {
        type: String,
        min: [3, 'must be greater than three digit'],
        max: [50, 'not allow to be more than 50 digit'],
        required: true
    },
    price: {
        type: Number,
        minlength: [1, 'the price must be greater than one egp'],
        maxlength: [1000000, 'the price not allow to be more than 1000000 egp'],
        required: true
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'category',
        min: [3, 'must be greater than three digit'],
        max: [50, 'not allow to be more than 50 digit'],
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    pdf: {
        type: String,
        required: true
    },
    buyingIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }],
});
const bookModel = mongoose_1.default.model('Book', bookSchema);
exports.default = bookModel;

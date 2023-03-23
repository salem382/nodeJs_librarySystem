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
exports.customer = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const ApiError_1 = require("../utils/ApiError");
const user_1 = __importDefault(require("./user"));
class Customer extends user_1.default {
    deleteProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                yield userModel_1.default.findByIdAndDelete(req.user_id);
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
    softDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, ApiError_1.catchError)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                yield userModel_1.default.findOneAndUpdate({ _id: req.user_id }, { status: 'notactive' });
                return res.json({ message: "success" });
            }))(req, res, next);
        });
    }
}
exports.customer = new Customer();

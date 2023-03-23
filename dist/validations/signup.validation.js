"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpValidation = joi_1.default.object({
    name: joi_1.default.string().alphanum().min(3).max(20).required(),
    email: joi_1.default.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'boxmail'] } }),
    password: joi_1.default.string().pattern(/^[a-zA-Z0-9]{3,30}$/).messages({
        'string.pattern.base': 'Invalid format. password Format should be start with lowercase or uppercase or number and the length shouid be from three digit to thirty digits'
    }),
    rePassword: joi_1.default.any().valid(joi_1.default.ref('password')).messages({
        'any.only': 'redPasswords do not match'
    }),
    phone: joi_1.default.number().integer().min(11).max(11)
});

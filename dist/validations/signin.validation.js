"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.logInValidation = joi_1.default.object({
    email: joi_1.default.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'boxmail'] } }),
    password: joi_1.default.string().pattern(/^[a-zA-Z0-9]{3,30}$/).messages({
        'string.pattern.base': 'Invalid format. password Format should be start with lowercase or uppercase or number and the length shouid be from three digit to thirty digits'
    })
});

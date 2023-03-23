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
const nodemailer_1 = __importDefault(require("nodemailer"));
const userModel_1 = __importDefault(require("../models/userModel"));
const emails_html_1 = require("../utils/emails.html");
const helpers_1 = require("../utils/helpers");
class Email {
    sendEmail(options, verify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ahmedsalem.official2@gmail.com',
                    pass: 'cugzaiaabkzphuym',
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const code = (0, helpers_1.generateCode)();
            yield userModel_1.default.findOneAndUpdate({ email: options.email }, { verifyCode: code });
            yield transporter.sendMail({
                from: '"Ahmed Salem " <ahmedsalem.official2@gmail.com>',
                to: options.email,
                subject: "Hello ✔",
                html: verify ? (0, emails_html_1.VerifyEmail)(options) : (0, emails_html_1.verifyPassword)(code)
            });
        });
    }
}
const emailService = new Email();
exports.default = emailService;

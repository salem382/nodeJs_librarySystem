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
process.on('uncaughtException', (err) => {
    console.log("Erro", err);
});
const ApiError_1 = require("./utils/ApiError");
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const ApiError_2 = require("./utils/ApiError");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const categoury_routes_1 = __importDefault(require("./routes/categoury.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const feedback_routes_1 = __importDefault(require("./routes/feedback.routes"));
const app = (0, express_1.default)();
(0, config_1.dbConnect)();
app.use(express_1.default.json());
app.use(express_1.default.static('uploads'));
app.use('/user', user_routes_1.default);
app.use('/category', categoury_routes_1.default);
app.use('/book', book_routes_1.default);
app.use('/feedback', feedback_routes_1.default);
app.use('*', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return next(new ApiError_2.AppError('invalide url' + req.originalUrl, 404));
}));
app.use(ApiError_1.errorHandler);
// process.on('unhandledRejection', () => {
//     console.log ("errrr222");
// })
app.listen(5000, () => console.log("server is running"));

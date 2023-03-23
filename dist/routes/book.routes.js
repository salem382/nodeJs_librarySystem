"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = __importDefault(require("../controlles/books"));
const verifyCustomer_1 = require("../middlewares/verifyCustomer");
const verifyAdmin_1 = require("../middlewares/verifyAdmin");
const fileupload_1 = require("../middlewares/fileupload");
const fields = ['image', 'pdf'];
const booksRouter = express_1.default.Router();
booksRouter.get('/', verifyCustomer_1.verifyCustomer, books_1.default.getAllBooks);
booksRouter.post('/', verifyCustomer_1.verifyCustomer, books_1.default.buyBook);
booksRouter.post('/add', verifyAdmin_1.verifyAdmin, (0, fileupload_1.fileUpload)(fields), books_1.default.addBook);
booksRouter.delete('/', verifyAdmin_1.verifyAdmin, books_1.default.deleteBook);
booksRouter.put('/', verifyAdmin_1.verifyAdmin, books_1.default.updateBook);
exports.default = booksRouter;

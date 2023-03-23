"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = __importDefault(require("../controlles/category"));
const express_1 = __importDefault(require("express"));
const verifyAdmin_1 = require("../middlewares/verifyAdmin");
const categoryRouter = express_1.default.Router();
categoryRouter.post('/', verifyAdmin_1.verifyAdmin, category_1.default.addCategory);
categoryRouter.get('/', category_1.default.getAllCategory);
categoryRouter.put('/', verifyAdmin_1.verifyAdmin, category_1.default.updateCategory);
categoryRouter.delete('/', verifyAdmin_1.verifyAdmin, category_1.default.deleteCategory);
exports.default = categoryRouter;

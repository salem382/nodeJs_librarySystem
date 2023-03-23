"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedBack_1 = __importDefault(require("../controlles/feedBack"));
const express_1 = __importDefault(require("express"));
const verifyCustomer_1 = require("../middlewares/verifyCustomer");
const isBuying_1 = require("../middlewares/isBuying");
const feedbackRouter = express_1.default.Router();
feedbackRouter.post('/', isBuying_1.isBuying, verifyCustomer_1.verifyCustomer, feedBack_1.default.addFeedback);
feedbackRouter.put('/', verifyCustomer_1.verifyCustomer, feedBack_1.default.updateFeedback);
feedbackRouter.delete('/', verifyCustomer_1.verifyCustomer, feedBack_1.default.deleteFeedback);
feedbackRouter.get('/', verifyCustomer_1.verifyCustomer, feedBack_1.default.getFeedback);
exports.default = feedbackRouter;

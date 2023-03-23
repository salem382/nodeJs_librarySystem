import feedback from "../controlles/feedBack";
import  express  from "express";
import { verifyCustomer } from "../middlewares/verifyCustomer";
import { isBuying } from "../middlewares/isBuying";

const feedbackRouter = express.Router();

feedbackRouter.post('/',isBuying, verifyCustomer,feedback.addFeedback);
feedbackRouter.put('/', verifyCustomer,feedback.updateFeedback);
feedbackRouter.delete('/', verifyCustomer,feedback.deleteFeedback);
feedbackRouter.get('/', verifyCustomer,feedback.getFeedback);

export default feedbackRouter;
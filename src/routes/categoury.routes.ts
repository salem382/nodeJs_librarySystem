import category from "../controlles/category";
import  express  from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin";


const categoryRouter = express.Router();

categoryRouter.post('/', verifyAdmin,category.addCategory);
categoryRouter.get('/' ,category.getAllCategory);
categoryRouter.put('/', verifyAdmin,category.updateCategory);
categoryRouter.delete('/', verifyAdmin,category.deleteCategory);

export default categoryRouter
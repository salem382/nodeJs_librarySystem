import  express  from "express";
import validation from "../middlewares/validation";
import books from "../controlles/books";
import { verifyCustomer } from "../middlewares/verifyCustomer";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import { fileUpload } from "../middlewares/fileupload";

const fields: string[] = ['image', 'pdf'];

const booksRouter = express.Router();

booksRouter.get('/',verifyCustomer,books.getAllBooks);
booksRouter.post('/',verifyCustomer,books.buyBook);
booksRouter.post('/add', verifyAdmin,fileUpload(fields),books.addBook);
booksRouter.delete('/',verifyAdmin,books.deleteBook);
booksRouter.put('/',verifyAdmin,books.updateBook);


export default booksRouter;
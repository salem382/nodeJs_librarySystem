
process.on('uncaughtException', (err) => {
    console.log ("Erro", err);
});

import { errorHandler } from './utils/ApiError';
import express from 'express';
import { dbConnect } from "./config/config";
import { AppError } from './utils/ApiError';
import userRouter from './routes/user.routes';
import categoryRouter from './routes/categoury.routes';
import booksRouter from './routes/book.routes';
import feedbackRouter from './routes/feedback.routes';


const app = express();

dbConnect();

app.use(express.json());
app.use(express.static('uploads'));

app.use('/user',userRouter);
app.use('/category',categoryRouter);
app.use('/book', booksRouter);
app.use('/feedback',feedbackRouter)

app.use('*', async (req, res, next) => {

    return next(new AppError('invalide url' + req.originalUrl, 404));
})

app.use(errorHandler);


// process.on('unhandledRejection', () => {
//     console.log ("errrr222");
// })

app.listen(5000, () => console.log ("server is running"));

import mongoose from "mongoose";

export const dbConnect = () => {

    mongoose.connect('mongodb://localhost:27017/librarySystem')
    .then(() =>  console.log ("database is connected"))
    .catch(() => console.log ("error in database"));
}


const express = require('express');
const connectDB = require('./config/database');
const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use('/api/user', userRouter)
app.use('/api/book', bookRouter)


connectDB();

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost/${PORT}`)
})
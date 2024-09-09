const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Database Connection Successfull!'))
    .catch((err) => {
        console.log('Database Connection Failed!')
        console.error(err);
    })
}

module.exports = connectDB;
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Book', bookSchema);
const express = require('express');
const { createBook, deleteBook, getBooks } = require('../controllers/book.controller');
const { auth, isAdmin } = require('../middlewares/middle');


const bookRouter = express.Router();

bookRouter.post('/upload', auth, isAdmin, createBook);
bookRouter.delete('/delete/:id', auth, isAdmin, deleteBook)
bookRouter.get('/fetch', auth, getBooks)

module.exports = bookRouter;
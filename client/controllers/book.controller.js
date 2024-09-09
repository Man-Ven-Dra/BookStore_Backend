const Book = require('../models/book.model');
const User = require('../models/user.model');
const connectCloudinary = require('../config/cloudinary')
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createBook = async(req, res) => {
    try {
        const {name, author, genre, data} = req.body;
        const cover = req.files.cover;
        const token = req.cookies.token;
        
        const user = jwt.decode(token, process.env.SECRET)

        if(!name || !author || !genre || !data) {
            return  res.status(401).json({
                success: false,
                message: 'Enter all Details'
            })
        }
        const response = await connectCloudinary(cover.tempFilePath)

        const newBook = await Book.create({
            name,
            author,
            genre,
            data,
            cover: response.secure_url,
        })
        const updateUser = await User.findByIdAndUpdate(user.id, {$push: {books: newBook._id}}, {new:true}).populate('books').exec();
        res.status(200).json({
            success: true,
            newBook,
            updateUser,
        })

    } catch (error) {
        console.log('Error in createBook ',error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteBook = async(req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const response = await Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Book Deleted Successfully!',
            response,
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.getBooks = async(req, res) => {
    try {
        const response = await Book.find();
        res.status(200).json({
            success: true,
            message: 'Books fetched Successfully!',
            response,
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async(req, res) => {
    try {
        const {username, email, password, role} = req.body;

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(401).json({
                success: false,
                message: 'User Already Exits!'
            })
        }

        if(!username || !email || !password || !role) {
            return  res.status(401).json({
                success: false,
                message: 'Enter all Details'
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
        })

        res.status(200).json({
            success:true,
            newUser,
            message: 'User Created Successfully!'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.login = async(req, res) => {
    try {
        const {email, password, confirmPassword} = req.body;
        if(!email || !password || !confirmPassword) {
            return  res.status(401).json({
                success: false,
                message: 'Enter all Details'
            })
        }

        if(password !== confirmPassword) {
            return  res.status(401).json({
                success: false,
                message: 'Confirm Password does not Match'
            })
        }

        let registered = await User.findOne({email})
        if(!registered) {
            return res.status(401).json({
                success: false,
                message: 'User not Signed in'
            })
        }

        const checkPassword = await bcrypt.compare(password, registered.password)

        const payload = {
            id: registered._id,
            email: registered.email,
            role: registered.role,
        }
        if(checkPassword) {
            const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: '3h',
            });
            registered = registered.toObject();
            registered.token = token;
            registered.password = undefined;

            const option = {
                expires: new Date( Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            } 
            res.cookie('token', token, option).status(200).json({
                success:true,
                token,
                registered,
                message: 'User Logged In Successfully!'
            })
        } else {
            return res.status(403).json({
                success: false,
                message: 'Incorrect Password'
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getUserBooks = async(req, res) => {
    try {
        const token = req.cookies.token;
        const userInfo = jwt.decode(token, process.env.SECRET);
        const user = await User.findById(userInfo.id).populate('books').exec();;
        const books = user.books
        res.status(200).json({
            success: true,
            message: 'User Books fetched Successfully!',
            books,
            user
        })

    } catch (error) {
        console.log('Error in createBook ',error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
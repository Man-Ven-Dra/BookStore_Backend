const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async(req, res, next) => {
    try {
        const cookie = req.cookies.token;
        if(!cookie){
            res.status(404).json({
                success: false,
                message: 'User not LoggedIn!'
            })
        } 
        try {
            const payload = jwt.verify(cookie, process.env.SECRET)
            console.log(payload);
            req.user = payload;
        }
        catch (err) {
            console.log(err);
            res.status(401).json({
                success: false,
                message: 'Token is Invalid',
            })
        }
    next();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.isAdmin = async(req, res, next) => {
    try {
        if(req.user.role !== 'Admin') {
            return res.status(401).json({
                success: false,
                message: 'Not Allowed to Access Admin Page'
            })
        }
    next();    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
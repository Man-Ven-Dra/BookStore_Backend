const express = require('express');
const { signup, login, getUserBooks } = require('../controllers/user.controller');
const { auth } = require('../middlewares/middle');

const userRouter = express.Router();

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.get('/fetch', auth, getUserBooks)

module.exports = userRouter;

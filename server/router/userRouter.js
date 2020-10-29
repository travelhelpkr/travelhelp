const express = require('express');
const signup = require('../controller/user/signup');

const userRouter = express.Router();

userRouter.post('/signup', signup.post);

module.exports = userRouter;

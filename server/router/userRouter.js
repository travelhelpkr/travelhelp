const express = require('express');
const signup = require('../controller/user/signup');
const signin = require('../controller/user/signin');

const userRouter = express.Router();

userRouter.post('/signup', signup.post);
userRouter.post('/signin', signin.post);


module.exports = userRouter;
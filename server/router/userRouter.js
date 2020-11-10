const express = require('express');

const signup = require('../controller/user/signup');
const signin = require('../controller/user/signin');
const signout = require('../controller/user/signout');

const userRouter = express.Router();

userRouter.post('/signup', signup.askSignup);
userRouter.post('/signin', signin.askSignin);
userRouter.post('/signout', signout.leaveService);

module.exports = userRouter;

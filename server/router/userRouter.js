const express = require('express');
const signup = require('../controller/user/signup');
const signin = require('../controller/user/signin');
const signout = require('../controller/user/signout');

const userRouter = express.Router();

userRouter.post('/signup', signup.post);
userRouter.post('/signin', signin.post);
userRouter.post('/signout', signout.post);


module.exports = userRouter;

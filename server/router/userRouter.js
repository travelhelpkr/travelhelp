const express = require('express');

const signup = require('../controller/user/signup');
const signin = require('../controller/user/signin');
const signout = require('../controller/user/signout');
const reset_password = require('../controller/user/reset_password');
const auth = require('../controller/user/auth');

const userRouter = express.Router();

userRouter.post('/signup', signup.post);
userRouter.post('/signin', signin.post);
userRouter.post('/signout', signout.post);
userRouter.post('/reset_password', reset_password.post);
userRouter.get('/auth/email', auth.getEmail);
userRouter.post('/auth/email', auth.postEmail);
userRouter.get('/auth/password', auth.getPassword);
userRouter.post('/auth/password', auth.postPassword);

module.exports = userRouter;

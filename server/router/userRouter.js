const express = require('express');

const signup = require('../controller/user/signup');
const signin = require('../controller/user/signin');
const signout = require('../controller/user/signout');
const mypage = require('../controller/user/mypage');

const userRouter = express.Router();

userRouter.post('/signup', signup.askSignup);
userRouter.post('/signin', signin.askSignin);
userRouter.post('/signout', signout.leaveService);

userRouter.get('/mypage/:id', mypage.orderHistory);

module.exports = userRouter;

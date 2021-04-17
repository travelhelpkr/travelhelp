import express from 'express';

import { User } from '../controller/user';

const userRouter = express.Router();

userRouter.post('/signup', User.askSignup);
userRouter.post('/signin', User.askSignin);
userRouter.post('/signout', User.leaveService);

userRouter.get('/mypage/:id', User.orderHistory);

export default userRouter;

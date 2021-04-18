import { Router } from 'express';

import { User } from '../controller/user';

export const userRouter = Router();

userRouter.post('/signup', User.askSignup);
userRouter.post('/signin', User.askSignin);
userRouter.post('/signout', User.leaveService);

userRouter.get('/mypage/:id', User.orderHistory);

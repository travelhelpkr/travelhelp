import { Router, Request, Response } from 'express';

import { userRouter } from './userRouter';
import { foodRouter } from './foodRouter';
import { authRouter } from './authRouter';

export const routes = Router();

// add API sub routes
routes.use('/api/users', userRouter);
routes.use('/api/auth', authRouter);
routes.use('/api/foods', foodRouter);

// show welcoming message when accessing the root URI with GET method
routes.get('/', (req: Request, res: Response) => {
  //  console.log('sessison: ', req.session);
  //  console.log('cookies: ', req.cookies);
  res.send('welcome to the Travel Help!');
});

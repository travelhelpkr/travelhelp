import { Router } from 'express';

import { Food } from '../controller/food';

export const foodRouter = Router();

foodRouter.get('/menu', Food.get);

foodRouter.post('/cart', Food.add);
foodRouter.get('/cart/:id', Food.show);
foodRouter.put('/cart', Food.update);
foodRouter.delete('/cart', Food.remove);

foodRouter.post('/order/:id', Food.addOrder);
foodRouter.get('/order/:id', Food.showAddress);

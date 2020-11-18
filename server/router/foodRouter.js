const express = require('express');
const menu = require('../controller/food/menu');
const cart = require('../controller/food/cart');
const order = require('../controller/food/order');

const foodRouter = express.Router();

foodRouter.get('/menu', menu.get);

foodRouter.post('/cart', cart.add);
foodRouter.get('/cart/:id', cart.show);
foodRouter.put('/cart', cart.update);
foodRouter.delete('/cart', cart.delete);

foodRouter.post('/order/:id', order.add);
foodRouter.get('/order/:id', order.show);

module.exports = foodRouter;

const express = require('express');
const menu = require('../controller/food/menu');
const cart = require('../controller/food/cart');

const foodRouter = express.Router();

foodRouter.get('/menu:id', menu.get);

foodRouter.post('/cart', cart.add);
foodRouter.get('/cart', cart.show);
foodRouter.put('/cart', cart.update);
foodRouter.delete('/cart', cart.delete);

module.exports = foodRouter;

const express = require('express');
const menu = require('../controller/food/menu');
const cart = require('../controller/food/cart');

const foodRouter = express.Router();

foodRouter.get('/menu', menu.get);

foodRouter.post('/order', cart.add);
foodRouter.get('/order', cart.show);
foodRouter.put('/order', cart.update);
foodRouter.delete('/order', cart.delete);

module.exports = foodRouter;

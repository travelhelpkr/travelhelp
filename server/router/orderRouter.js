const express = require('express');
const cart = require('../controller/order/cart');

const orderRouter = express.Router();

orderRouter.post('/cart', cart.get);
orderRouter.get('/cart', cart.get);
orderRouter.update('/cart', cart.get);
orderRouter.delete('/cart', cart.get);

module.exports = orderRouter;

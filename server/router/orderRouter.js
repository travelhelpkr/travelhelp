const express = require('express');
const cart = require('../controller/order/cart');

const orderRouter = express.Router();

orderRouter.post('/cart', cart.add);
orderRouter.get('/cart', cart.show);
orderRouter.put('/cart', cart.update);
orderRouter.delete('/cart', cart.delete);

module.exports = orderRouter;

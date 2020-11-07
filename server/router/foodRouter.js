const express = require('express');
const menu = require('../controller/food/menu');
const restaurant = require('../controller/food/restaurant');

const foodRouter = express.Router();

foodRouter.get('/menu', menu.get);
foodRouter.get('/restaurant', restaurant.get);

module.exports = foodRouter;

const express = require('express');
const menu = require('../controller/food/menu');

const foodRouter = express.Router();

foodRouter.get('/menu', menu.get);

module.exports = foodRouter;

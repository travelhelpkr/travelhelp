const { Menu } = require('../../models');

/*
1. check req.query.restaurant_id
2. send menu information about matched restaurant
*/

module.exports = {
  get: async (req, res) => {

    try {
      // check restaurant id
      const restaurant_id = req.query.restaurant_id;
      // get all menus matched with restaurant_id
      const foodMenu = await Menu.findAll({
        where: {
          restaurant_id: restaurant_id
        }
      });
      res.status(200).send(foodMenu);
    }
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.'
      });  
    }
    
  }
};

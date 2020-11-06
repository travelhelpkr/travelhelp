const { Menu } = require('../../models');

/*
1. check req.query.restaurant_id
2. send menu information about matched restaurant
*/

module.exports = {
  get: async (req, res) => {

    // check restaurant id
    const restaurant_id = req.query.restaurant_id;

    // get all menus matched with restaurant id
    await Menu.findAll({
      where: {
        restaurant_id: restaurant_id
      }
    })
    .then(result => {
      res.status(200).send(result);
    })
  }
};

const { Menu, Option } = require('../../models');

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
      // Left join Option table 
      const foodMenu = await Menu.findAll({
        attributes: [ 'id', 'image', 'name_en', 'name_zh', 'name_ja', 'description_en', 'description_zh', 'description_ja', 'price' ],
        where: {
          restaurant_id: restaurant_id
        },
        include: {
          model: Option,
          attributes: [ 'name_en', 'name_zh', 'name_ja', 'price' ]
        }
      });
      
      console.log('foodMenu: ', foodMenu[0].dataValues.Options[0]);
      // console.log('foodMenu: ', foodMenu[0]);

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

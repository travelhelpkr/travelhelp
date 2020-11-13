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
      const foodMenu = await Menu.findAll({
        attributes: [ 'id', 'image', 'name_en', 'name_zh', 'name_ja', 'description_en', 'description_zh', 'description_ja', 'price' ],
        where: {
          restaurant_id: restaurant_id
        },
        include: {
          model: Option,
          attributes: [ 'name_en', 'name_zh', 'name_ja', 'price' ],
          // hide unwanted `Menu_option` nested object from results
          through: { attributes: [] }
        }
      });

      console.log(foodMenu[0].dataValues.Options[0]._options);
      
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

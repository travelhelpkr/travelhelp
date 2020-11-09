const { Restaurant } = require('../../models');

/*
1. check id of restaurant table 
2. send restaurant information matched with id(PK)
*/

module.exports = {
  get: async (req, res) => {
    try {
      // check restaurant id
      const id = req.query.id;
  
      // get restaurant information with id of restaurant table
      const theRestaurant = await Restaurant.findOne({
        where: {
          id: id
        }
      });
      
      res.status(200).send([{
        "name_en": theRestaurant.dataValues.name_en,
        "name_zh": theRestaurant.dataValues.name_zh,
        "name_ja": theRestaurant.dataValues.name_ja,
        "description_en": theRestaurant.dataValues.description_en,
        "description_zh": theRestaurant.dataValues.description_zh,
        "description_ja": theRestaurant.dataValues.description_ja,
        "operation_hour": theRestaurant.dataValues.operation_hour,
        "minimum_price": theRestaurant.dataValues.minimum_price,
        "delivery_fee": theRestaurant.dataValues.delivery_fee
      }]);
    }
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.'
      });  
    }
  }
};

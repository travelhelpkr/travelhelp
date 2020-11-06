const { Restaurant } = require('../../models');

/*
1. check id of restaurant table
2. send restaurant information matched with id(PK)
*/

module.exports = {
  get: async (req, res) => {

    // check restaurant id
    const id = req.query.id;

    // get restaurant information with id of restaurant table
    await Restaurant.findOne({
      where: {
        id: id
      }
    })
    .then(result => {
      res.status(200).send([{
        "name_en": result.dataValues.name_en,
        "name_zh": result.dataValues.name_zh,
        "name_ja": result.dataValues.name_ja,
        "description_en": result.dataValues.description_en,
        "description_zh": result.dataValues.description_zh,
        "description_ja": result.dataValues.description_ja,
        "operation_hour": result.dataValues.operation_hour,
        "minimum_price": result.dataValues.minimum_price,
        "delivery_fee": result.dataValues.delivery_fee
      }]);
    })
  }
};

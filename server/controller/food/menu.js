const { Order, Menu, Restaurant, Option } = require('../../models');

/*
1. check req.query.restaurant_id
2. send menu information about matched restaurant
*/

module.exports = {
  get: async (req, res) => {

    try {
      // check restaurant id
      const restaurant_id = req.query.restaurant_id;
      
      // restaurant information for sending
      const selectedRestaurant = await Restaurant.findOne({
        attributes: [ 'id', 'name_en', 'name_zh', 'name_ja', 'description_en', 'description_zh', 'description_ja', 'operation_hour', 'minimum_price', 'delivery_fee' ],
        where: {
          id: restaurant_id
        }
      });

      // filter dataValues only;
      const selectedRestaurantObj = selectedRestaurant.dataValues;

      // check user's signin status
      const { user_id } = req.body;

      // if user exists && `is_cart` value from order table is `ture`
      // send user's order table's menu values for checking existing menu's restaurant id.
      if (user_id) {
        // check user's cart status
        const userCart = await Order.findOne({
          attributes: [ id ],
          where: {
            user_id: user_id,
            is_cart: true
          }
        });

        if (userCart) {
          // get all menus matched with restaurant_id
          const foodMenu = await Menu.findAll({
            attributes: [ 'id', 'image', 'name_en', 'name_zh', 'name_ja', 'description_en', 'description_zh', 'description_ja', 'price', 'restaurant_id' ],
            where: {
              restaurant_id: restaurant_id
            },
            include: [{
              model: Option,
              attributes: [ 'id', 'name_en', 'name_zh', 'name_ja', 'price' ],
              // hide unwanted `Menu_option` nested object from results. by explicitly defining through option, we can hide junction table's values from result.
              through: { attributes: [] }
            }, {
              // pick only menu_id belongs to selected order_menu id
              // this menu value will be employeed for checking restaurant id validation on cart page from client side
              model: Order,
              attributes: [ 'id' ],
              through: { attributes: [ menu_id ] },
              where: {
                id: userCart.dataValues.id,
                is_cart: true
              },
              require: false
            }]
          });

          const foodMenuArr = foodMenu.reduce((acc, cur) => {
            let menu = cur.dataValues;
            menu.Options = menu.Options.map(option => option.dataValues);
            acc.push(menu);
            return acc;
          }, []);

          console.log('foodMenuArr: ', foodMenuArr);
          res.status(200).send({ menu: foodMenuArr, restaurant: selectedRestaurantObj });
        }
      }
      // if user doesn't exist, send only menu information
      else {
        // get all menus matched with restaurant_id
        const foodMenu = await Menu.findAll({
          attributes: [ 'id', 'image', 'name_en', 'name_zh', 'name_ja', 'description_en', 'description_zh', 'description_ja', 'price', 'restaurant_id' ],
          where: {
            restaurant_id: restaurant_id
          },
          include: [{
            model: Option,
            attributes: [ 'id', 'name_en', 'name_zh', 'name_ja', 'price' ],
            // hide unwanted `Menu_option` nested object from results
            through: { attributes: [] }
          }]
        });

        const foodMenuArr = foodMenu.reduce((acc, cur) => {
          let menu = cur.dataValues;
          menu.Options = menu.Options.map(option => option.dataValues);
          acc.push(menu);
          return acc;
        }, []);

        // console.log('foodMenuArr: ', foodMenuArr);
        // console.log('selectedRestaruant: ', selectedRestaurantObj);
        res.status(200).send({ menu: foodMenuArr, restaurant: selectedRestaurantObj });
      }
    } 
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.'
      });
    }
    
  }
};

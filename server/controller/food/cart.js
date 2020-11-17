const { User, Menu, Order, Order_menu, Restaurant, Option } = require('../../models');
const Sequelize = require('sequelize')
/*
// this restaurant checking process will be done from client side.
1. if the restaurant value is different with existing menu
  1. message: "You can only order at one restaurant at a time"
    1. user can select replace the cart into new menu or keep the cart as it was

add
1. receive post request for 'add cart'
(required body values: user id, selected menu id, selected option id)
  1. add menu information on user's db

get
1. receive get request for 'show cart'
  1. required body value: user id
2. find all user information from order table
  1. select only in case is_cart value is true
    1. response menu information through the cart
  2. if no information, return err

restaurant name (en, zh, ja)
restaurant minimum_price
restaurant delivery_fee
restaurant operation_hour
menu id
menu name (en, zh, ja)
menu image
menu price
menu restaurant_id
menu_order quantity
option id
option name (en, zh, ja)
option price
*/

module.exports = {
  // update user's db with selected menu
  add: async (req, res) => {

    try {
      const { user_id, menu_id, option_id } = req.body;

      // checking existing user's menu from the cart
      const existingCartMenu = await Menu.findOne({
        attributes: [ 'restaurant_id' ],
        include: {
          model: Order,
          through: { attributes: [] },
          where: {
            user_id: user_id
          }
        }
      });

      // checking existing restaurant id from the cart
      const existingRestaurantId = existingCartMenu.restaurant_id;
      console.log('restaurant id from the existing cart::::::::', existingRestaurantId);

      const targetMenu = await Menu.findOne({
        attributes: [ 'restaurant_id' ],
        where: {
          id: menu_id
        }
      });
      
      // checking request menu's restaurant id
      const newRestaurantId = targetMenu.restaurant_id;
      console.log('restaurant id from the request menu::::::::', newRestaurantId);

      // compare existing cart's restaurant & newly requested menu's restaurant id
      if (existingRestaurantId !== newRestaurantId) {
        res.send({ status: 409, confilct: true, message: 'only same restaurant order is available' });
      }
      else {
        const [ targetOrder, isCreatedOrder ] = await Order.findOrCreate({
          where: {
            is_cart: true,
            user_id: user_id
          }
        });
        // console.log('targetOrder: ', targetOrder.toJSON());
        
        const [ targetOrderMenu, isCreatedOrderMenu ] = await Order_menu.findOrCreate({
          where: {
            order_id: targetOrder.id,
            menu_id: menu_id, 
            option_id: option_id
          }
        });
        // console.log('targetOrderMenu: ', targetOrderMenu.toJSON());

        console.log('is created Order: ', isCreatedOrder);
        console.log('is created OrderMenu: ', isCreatedOrderMenu);
        if (!isCreatedOrder && !isCreatedOrderMenu) {
          res.send({ status: 409, message: 'this menu already exists in the user cart' });
        }
        else {
          res.send({ status: 200, message: 'menu added in user cart' });
        }
      }
    } 
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });  
    }
    
  },
  
  show: async (req, res) => {
    
    try {
      const user_id = req.params.id;

      const userCart = await Order.findOne({
        attributes: [ 'id' ],
        where: {
          is_cart: true,
          user_id: user_id
        }
      });

      // define selected cart's order id after finding the user cart
      const orderId = userCart.id;
      console.log('orderId::::::::', orderId);

      const listCartArr = await Order_menu.findAll({
        attributes: [ 'quantity' ],
        where: {
          order_id: orderId
        },
        include: [{
          model: Menu,
          attributes: [ 'id', 'image', 'name_en', 'name_zh', 'name_ja', 'price', 'restaurant_id' ] 
        }, {
          model: Option,
          attributes: [ 'id', 'name_en', 'name_zh', 'name_ja', 'price' ]
        }], 
        raw: true,
        nest: true
      });
      console.log('listCartArr::::::::', listCartArr[0]);
      
      const restaurantInfo = await Restaurant.findOne({
        attributes: [ 'id', 'name_en', 'name_zh', 'name_ja', 'category_en', 'category_zh', 'category_ja', 'operation_hour', 'minimum_price', 'delivery_fee' ],
        where: {
          id: listCartArr[0].Menu.restaurant_id
        },
        raw: true
      });
      console.log('restaurantInfo::::::::', restaurantInfo);
 
      res.status(200).send({ order_id: orderId, cart: listCartArr, restaurant: restaurantInfo });
    } 
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });  
    }

  },

  update: async (req, res) => {

    try {
      const { } = req.body;

            // const selectedMenu = await Menu.findOne({
      //   attributes: [ 'id', 'image', 'name_en', 'name_zh', 'name_ja', 'price', 'restaurant_id' ],
      //   where: {
      //     id: menu_id
      //   },
      //   include: [{
      //     model: Option,
      //     attributes: [ 'id', 'name_en', 'name_zh', 'name_ja', 'price' ],
      //     // hide unwanted `Menu_option` nested object from results. by explicitly defining through option, we can hide junction table's values from result.
      //     through: { attributes: [] }
      //   }, {
      //     // pick only menu_id belongs to selected order_menu id
      //     // this menu value will be employeed for checking restaurant id validation on cart page from client side
      //     model: Order,
      //     attributes: [ 'id' ],
      //     through: { attributes: [ menu_id ] },
      //     where: {
      //       id: userCart.dataValues.id,
      //       is_cart: true
      //     },
      //     require: false
      //   }]
      // });

      // const foodMenuArr = foodMenu.reduce((acc, cur) => {
      //   let menu = cur.dataValues;
      //   menu.Options = menu.Options.map(option => option.dataValues);
      //   acc.push(menu);
      //   return acc;
      // }, []);

      // console.log('foodMenuArr: ', foodMenuArr);
      // res.status(200).send({ listCart: listCartArr, restaurant: selectedRestaurantObj });
      
    } 
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.'
      });  
    }

  },
  
  delete: async (req, res) => {

    try {
      const { } = req.body;
      
    } 
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.'
      });  
    }

  },


};

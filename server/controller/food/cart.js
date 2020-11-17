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

      // if there is already some menu in the cart
      if (existingCartMenu) {
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
  
        // compare existing cart's restaurant id & newly requested menu's restaurant id
        if (existingRestaurantId !== newRestaurantId) {
          return res.send({ status: 409, conflict: true, message: 'only same restaurant order is available' });
        }
      }

      // if `is_cart` = true & `user_id` = user_id, find its value. Or create it.
      const [ targetOrder, isCreatedOrder ] = await Order.findOrCreate({
        where: {
          is_cart: true,
          user_id: user_id
        }
      });
      // console.log('targetOrder:::::::: ', targetOrder.toJSON());
      
      // check whether the same menu already exists in the cart from the same user.
      const [ targetOrderMenu, isCreatedOrderMenu ] = await Order_menu.findOrCreate({
        where: {
          order_id: targetOrder.id,
          menu_id: menu_id, 
          option_id: option_id
        }
      });
      // console.log('targetOrderMenu:::::::: ', targetOrderMenu.toJSON());

      console.log('is created Order:::::::: ', isCreatedOrder);
      console.log('is created OrderMenu:::::::: ', isCreatedOrderMenu);
      // if cart already exists from this user && same menu(with same option) exists
      if (!isCreatedOrder && !isCreatedOrderMenu) {
        res.send({ status: 409, message: 'this menu already exists in the user cart' });
      }
      else {
        res.send({ status: 200, message: 'menu added in user cart' });
      }
    } 
    catch (err) {
      // response err to the client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });  
    }
    
  },
  
  show: async (req, res) => {
    
    try {
      const user_id = req.params.id;

      const listCartArr = await Order_menu.findAll({
        attributes: [ 'quantity' ],
        include: [{
          model: Order,
          attributes: [ 'id' ],
          where: {
            user_id: user_id
          }
        },{
          model: Menu,
          attributes: [ 'id', 'image', 'name_en', 'name_zh', 'name_ja', 'price', 'restaurant_id' ] 
        }, {
          model: Option,
          attributes: [ 'id', 'name_en', 'name_zh', 'name_ja', 'price' ]
        }], 
        raw: true,
        nest: true
      });
      console.log('listCartArr::::::::', listCartArr);
      
      const restaurantInfo = await Restaurant.findOne({
        attributes: { exclude: [ 'description_en', 'description_zh', 'description_ja', 'createdAt', 'updatedAt' ] },
        where: {
          id: listCartArr[0].Menu.restaurant_id
        },
        raw: true
      });
      console.log('restaurantInfo::::::::', restaurantInfo);
 
      res.status(200).send({ cart: listCartArr, restaurant: restaurantInfo });
    } 
    catch (err) {
      // response err to the client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });
    }

  },

  update: async (req, res) => {

    try {
      const { order_id, menu_id, option_id, quantity } = req.body;

      const affectedRows = await Order_menu.update({ quantity: quantity }, {
        where: {
          order_id: order_id,
          menu_id: menu_id,
          option_id: option_id
        }
      });
      console.log('affectedRows::::::::', affectedRows);

      res.status(200).send({ message: 'successfully updated menu quantity' });
    } 
    catch (err) {
      // response err to the client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });  
    }

  },
  
  delete: async (req, res) => {

    try {
      const { order_id, menu_id, option_id } = req.body;

      const deletedRow = await Order_menu.destroy({
        where: {
          order_id: order_id,
          menu_id: menu_id,
          option_id: option_id
        }
      });
      console.log('deletedRow::::::::', deletedRow);

      if (!deletedRow) {
        throw new Error('nothing to delete');
      }

      // check empty cart. check Order_menu table's order id count & rows.
      const { count, rows } = await Order.findAndCountAll({
        attributes: [],
        include: { 
          model: Order_menu,
          attributes: [ 'id', 'order_id', 'menu_id', 'option_id' ],
          required: true,
          where: {
            order_id: order_id
          }
        },
        raw: true,
        nest: true
      });

      // if cart is empty, delete user cart.
      if (!count) {
        const deleteCart = await Order.destroy({
          where: {
            id: order_id
          }
        });
      } 

      res.status(200).send({ message: 'successfully deleted the menu' });      
    } 
    catch (err) {
      // response err to the client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });  
    }

  }
};

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
      
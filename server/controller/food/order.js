const { Address_book, Menu, Order, Order_menu, Restaurant, Option } = require('../../models');

module.exports = {
  // update user's db with selected menu
  add: async (req, res) => {

    try {
      const user_id = req.params.id;
      const { order_id, address, postal_code, contact } = req.body;

      // after clicking 'paynow' button,
      // create new values on the addressbook db
      const newAddress = await Address_book.create({
        address: address,
        postal_code: postal_code,
        contact: contact,
        user_id: user_id
      });
      console.log('new address::::::::', newAddress);
      console.log('new address id::::::::', newAddress.id);
          
      // if finished payment process,
      // update Order table coresponding its order status
      const updatedOrderRaws = await Order.update({
        address_book_id: newAddress.id,
        is_cart: false,
        purchased_at: new Date()
      }, {
        where: {
          user_id: user_id,
          is_cart: true
        }
      });
      console.log('updatedAddressBookId::::::::', updatedOrderRaws);
      
      res.send({ status: 200, message: 'Successfully made your order. Delivery in process' });
      // const updateAddressBookId = await newAddress.setOrders({
      //   address_book_id: newAddress.id,
      //   where: {
      //     user_id: user_id
      //   }, 
      // });

      // if (!isCreatedOrder && !isCreatedOrderMenu) {
      //   res.send({ status: 409, message: 'this menu already exists in the user cart' });
      // }
      // else {
        
      // }
    } 
    catch (err) {
      // response err to the client
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });  
    }
    
  },
  
  show: async (req, res) => {
    
    try {
      const user_id = req.params.id;
      const { order_id, address, postal_code, contact } = req.query;

      // checking existing user's menu from the cart
      const recentAddress = await Address_book.findAll({
        attributes: [ 'address', 'postal_code', 'contact' ],
        include: {
          model: Order,
          // attributes: [ 'purchased_at' ],
          // attributes: [],
          where: {
            user_id: user_id,
            is_cart: false
          }
        },
        order: [Address_book.associations.Orders, 'id', 'DESC'],
        limit: 5
      });

      console.log('recent address::::::::', recentAddress);

      // const listCartArr = await Order_menu.findAll({
      //   attributes: [ 'quantity' ],
      //   include: [{
      //     model: Order,
      //     attributes: [ 'id' ],
      //     where: {
      //       user_id: user_id
      //     }
      //   },{
      //     model: Menu,
      //     attributes: [ 'id', 'image', 'name_en', 'name_zh', 'name_ja', 'price', 'restaurant_id' ] 
      //   }, {
      //     model: Option,
      //     attributes: [ 'id', 'name_en', 'name_zh', 'name_ja', 'price' ]
      //   }], 
      //   raw: true,
      //   nest: true
      // });
      // console.log('listCartArr::::::::', listCartArr);
      
      // const restaurantInfo = await Restaurant.findOne({
      //   attributes: { exclude: [ 'description_en', 'description_zh', 'description_ja', 'createdAt', 'updatedAt' ] },
      //   where: {
      //     id: listCartArr[0].Menu.restaurant_id
      //   },
      //   raw: true
      // });
      // console.log('restaurantInfo::::::::', restaurantInfo);
 
      res.status(200).send({ recent_address: recentAddress });
    } 
    catch (err) {
      // response err to the client
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });
    }

  },

  update: async (req, res) => {

    try {
      const user_id = req.params.id;
      const { order_id, address, postal_code, contact } = req.body;

      const newAddress = await Address_book.create({
        address: address,
        postal_code: postal_code,
        contact: contact,
        include: {
          model: Order,

          where: {
            id: Sequelize.where(Sequelize.col('newAddress.id'))
          }
        }
      });

      const affectedRows = await Order_menu.update({ quantity: quantity }, {
        where: {
          order_id: order_id,
          menu_id: menu_id,
          option_id: option_id || null
        }
      });
      console.log('affectedRows::::::::', affectedRows);

      res.status(200).send({ message: 'successfully updated menu quantity' });
    } 
    catch (err) {
      // response err to the client
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });  
    }

  },
  
  delete: async (req, res) => {

    try {
      const { order_id, menu_id, option_id } = req.query;

      const deletedRow = await Order_menu.destroy({
        where: {
          order_id: order_id,
          menu_id: menu_id,
          option_id: option_id || null
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
      // response err to the client
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });  
    }

  }
};

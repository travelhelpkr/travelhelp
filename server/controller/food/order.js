const { Address_book, Menu, Order, Order_menu, Restaurant, Option } = require('../../models');

module.exports = {
  // update user's db with selected menu
  add: async (req, res) => {

    try {
      const user_id = req.params.id;
      const { address, postal_code, contact } = req.body;

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
      // [doing] test code for using set menthod for updating
      // const updateAddressBookId = await newAddress.setOrders({
      //   address_book_id: newAddress.id,
      //   where: {
      //     user_id: user_id
      //   }, 
      // });
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
 
      res.status(200).send({ recent_address: recentAddress });
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

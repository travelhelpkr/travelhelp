const { User } = require('../../models');

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
menu_order quantity
option id
option name (en, zh, ja)
option price
*/

module.exports = {
  // make Cart  
  add: async (req, res) => {

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

  show: async (req, res) => {

    try {
      
      
    } 
    catch (err) {
      // response err to client. no need to throw err.
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.'
      });  
    }

  },

  update: async (req, res) => {

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

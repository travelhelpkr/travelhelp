import { Request, Response } from 'express';

import { Menu, Restaurant, Option } from '../../models';

export const get = async (req: Request, res: Response) => {

  try {
    // check restaurant id
    const restaurant_id: any = req.query.restaurant_id;
    
    // restaurant information for sending
    const selectedRestaurant = await Restaurant.findOne({
      attributes: [ 'id', 'name_en', 'name_zh', 'name_ja', 'description_en', 'description_zh', 'description_ja', 'operation_hour', 'minimum_price', 'delivery_fee' ],
      where: {
        id: restaurant_id
      }
    });

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
    res.status(200).send({ menu: foodMenuArr, restaurant: selectedRestaurant.toJSON() });

  } 
  catch (err) {
    // response err to client
    res.status(err.status || 500).json({
      message: err.message || 'Server does not response.',
      stack: err.stack
    });
  }
  
}


/*
below code has left here for just reference.
It was made for checking existing restaurant id from the cart of the user.
But it was accomplished from cart API. So no longer necessary from this menu API.

// check user's signin status
const user_id = req.params.id;

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
    res.status(200).send({ menu: foodMenuArr, restaurant: selectedRestaurant.toJSON() });
  }
}
*/
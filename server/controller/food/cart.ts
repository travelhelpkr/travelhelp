import { Request, Response } from 'express';

import { Menu, Order, Order_menu, Restaurant, Option } from '../../models';

// update user's db with selected menu
export const add = async (req: Request, res: Response) => {

  try {
    const { user_id, menu_id, option_id }: { user_id: number, menu_id: number, option_id: number} = req.body;

    // checking existing user's menu from the cart
    const existingCartMenu = await Menu.findOne({
      attributes: [ 'restaurant_id' ],
      include: {
        model: Order,
        through: { attributes: [] },
        where: {
          user_id: user_id,
          is_cart: true
        }
      }
    });

    // if there is already some menu in the cart
    if (existingCartMenu) {
      const existingRestaurantId: number = existingCartMenu.restaurant_id;
      // console.log('restaurant id from the existing cart::::::::', existingRestaurantId);

      const targetMenu = await Menu.findOne({
        attributes: [ 'restaurant_id' ],
        where: {
          id: menu_id
        }
      });
      
      // checking request menu's restaurant id
      const newRestaurantId: number = targetMenu.restaurant_id;
      // console.log('restaurant id from the request menu::::::::', newRestaurantId);

      // compare existing cart's restaurant id & newly requested menu's restaurant id
      if (existingRestaurantId !== newRestaurantId) {
        return res.send({ status: 409, conflict: true, message: 'only same restaurant order is available' });
      }
    }

    // if `is_cart` = true & `user_id` = user_id, find its value. Or create it.
    const [ targetOrder, isCreatedOrder ]: [ any, boolean ] = await Order.findOrCreate({
      where: {
        is_cart: true,
        user_id: user_id
      }
    });
    // console.log('targetOrder:::::::: ', targetOrder.toJSON());
    
    // check whether the same menu already exists in the cart from the same user.
    const [ targetOrderMenu, isCreatedOrderMenu ]: [ any, boolean ] = await Order_menu.findOrCreate({
      where: {
        order_id: targetOrder.id,
        menu_id: menu_id, 
        option_id: option_id
      }
    });
    // console.log('targetOrderMenu:::::::: ', targetOrderMenu.toJSON());
    // console.log('is created Order:::::::: ', isCreatedOrder);
    // console.log('is created OrderMenu:::::::: ', isCreatedOrderMenu);

    // if cart already exists from this user && same menu(with same option) exists
    if (!isCreatedOrder && !isCreatedOrderMenu) {
      res.send({ status: 409, message: 'this menu already exists in the user cart' });
    }
    else {
      res.send({ status: 200, message: 'menu added in user cart' });
    }
  } 
  catch (err) {
    // response err to the client
    res.status(err.status || 500).json({
      message: err.message || 'Server does not response.',
      stack: err.stack
    });  
  }
  
}

export const show = async (req: Request, res: Response) => {
  
  try {
    const user_id: string = req.params.id;

    const checkCartStatus = await Order.findOne({
      attributes: [ 'is_cart' ],
      where: { user_id: user_id, is_cart: true },
      raw: true
    });

    // check empty cart. if empty, return just message.
    if (!checkCartStatus) {
      return res.status(200).send({ message: 'empty cart' });
    }

    // show menus only in case the user & cart exists on DB
    if (user_id && checkCartStatus) {
      const listCartArr = await Order_menu.findAll({
        attributes: [ 'quantity' ],
        include: [{
          model: Order,
          attributes: [ 'id' ],
          where: {
            user_id: user_id,
            is_cart: true
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
      // console.log('listCartArr::::::::', listCartArr);
      
      const restaurantInfo = await Restaurant.findOne({
        attributes: { exclude: [ 'description_en', 'description_zh', 'description_ja', 'createdAt', 'updatedAt' ] },
        where: {
          id: listCartArr[0].Menu.restaurant_id
        },
        raw: true
      });
      // console.log('restaurantInfo::::::::', restaurantInfo);
      
      res.status(200).send({ cart: listCartArr, restaurant: restaurantInfo });
    }
    else {
      throw new Error('something went wrong.');
    }
  } 
  catch (err) {
    // response err to the client
    res.status(err.status || 500).json({
      message: err.message || 'Server does not response.',
      stack: err.stack
    });
  }

}

export const update = async (req: Request, res: Response) => {

  try {
    const { order_id, menu_id, option_id, quantity }: { order_id: number, menu_id: number, option_id: number, quantity: number } = req.body;

    const affectedRows = await Order_menu.update({ 
      quantity: quantity 
    }, {
      where: {
        order_id: order_id,
        menu_id: menu_id,
        option_id: option_id || null
      }
    });
    // console.log('affectedRows::::::::', affectedRows);

    res.status(200).send({ message: 'successfully updated menu quantity' });
  } 
  catch (err) {
    // response err to the client
    res.status(err.status || 500).json({
      message: err.message || 'Server does not response.',
      stack: err.stack
    });  
  }
}

export const remove = async (req: any, res: Response) => {

  try {
    const { order_id, menu_id, option_id }: { order_id: number, menu_id: number, option_id: number } = req.query;

    const deletedRow = await Order_menu.destroy({
      where: {
        order_id: order_id,
        menu_id: menu_id,
        option_id: option_id || null
      }
    });
    // console.log('deletedRow::::::::', deletedRow);

    if (!deletedRow) {
      throw new Error('nothing to delete');
    }

    // check empty cart. check Order_menu table's order id count & rows.
    const { count, rows }: { count: number, rows: number } = await Order.findAndCountAll({
      attributes: [],
      include: { 
        model: Order_menu,
        attributes: [ 'id', 'order_id', 'menu_id', 'option_id' ],
        where: {
          order_id: order_id
        }
      },
      raw: true,
      nest: true
    });

    // if cart is empty, delete user cart.
    if (!count) {
      await Order.destroy({
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

import { Request, Response } from 'express';
import { sequelize, Address_book, Order, Restaurant, Menu, Option, Order_menu } from '../../models';

// update user's db with selected menu
const orderHistory = async (req: Request, res:Response) => {
  try {
    const user_id: string = req.params.id;

    // find all order history about the user
    const orderHistory = await Order.findAll({
      attributes: [ 'id', 'user_id', 'purchased_at'],
      where: {
        user_id: user_id,
        is_cart: false
      },
      include: [{
        model: Address_book,
        attributes: [ 'id', 'address', 'postal_code', 'contact' ]
      }],
      raw: true,
      nest: true,
      order: [ [ 'purchased_at', 'DESC' ] ]
    });
    
    // extracting `id` array from `Order` table through orderHistory
    const orderIdList = orderHistory.map((order : { id: number }) => order.id);
    
    // empty array for containing values from below iterator function
    const menusByOrderId = [];

    // find menus by `Order` table's `id' obtained by orderIdList
    for(let i: number = 0; i < orderIdList.length; i++) {
      const menusForAnOrder = await Order_menu.findAll({
        attributes: [
          'order_id', 'quantity',
          [sequelize.col('Menu.Restaurant.name_en'), 'Restaurant.name_en'],
          [sequelize.col('Menu.Restaurant.name_zh'), 'Restaurant.name_zh'],
          [sequelize.col('Menu.Restaurant.name_ja'), 'Restaurant.name_ja'],
          [sequelize.col('Menu.Restaurant.delivery_fee'), 'Restaurant.delivery_fee']
        ],
        where: { order_id: orderIdList[i] },
        include: [{
          model: Menu,
          attributes: [ 'id', 'name_en', 'name_zh', 'name_ja', 'price' ],
          include: {
            // this table just for referencing 'Restaurant' table from above attributes
            model: Restaurant,
            attributes: []
          }
        }, {
          model: Option,
          attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
        }],
        raw: true,
        nest: true
      });

      menusByOrderId.push(menusForAnOrder);
    }

    // add menusByOrderId as `Menus` object in the orderHistory array
    for(let i: number = 0; i < orderHistory.length; i++) {
      orderHistory[i]['Menus'] = menusByOrderId[i];
    };
    
    res.status(200).send({ order_history: orderHistory });
  } 
  catch (err) {
    // response err to the client
    res.status(err.status || 500).json({
      message: err.message || 'Server does not response.',
      stack: err.stack
    });  
  }
}

export { orderHistory }

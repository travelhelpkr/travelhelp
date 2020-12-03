'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Option, {
        foreignKey: 'option_id'
      });
      // defined belows for manipulating other models from this `Order_menu` table
      this.belongsTo(models.Menu, {
        foreignKey: 'menu_id'
      });
      this.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
    }
  };
  Order_menu.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Order_menu',
  });

  return Order_menu;
};
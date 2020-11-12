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
      this.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
      this.belongsTo(models.Menu, {
        foreignKey: 'menu_id'
      });
    }
  };
  Order_menu.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    order_id: DataTypes.INTEGER,
    menu_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_menu',
  });

  // Order_menu.associate = function(models) {
  //   Order_menu.belongsTo(models.Order, {
  //     foreignKey: 'order_id'
  //   });
  //   Order_menu.belongsTo(models.Menu, {
  //     foreignKey: 'menu_id'
  //   });
  // }
  return Order_menu;
};
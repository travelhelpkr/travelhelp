'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders_menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  orders_menus.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    order_id: DataTypes.INTEGER,
    menu_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders_menus',
  });
  orders_menus.associate = function(models) {
    orders_menus.belongsTo(models.orders, {
      foreignKey: 'order_id'
    });
    orders_menus.belongsTo(models.menus, {
      foreignKey: 'menu_id'
    });
  }
  return orders_menus;
};
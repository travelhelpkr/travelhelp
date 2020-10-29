'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    is_cart: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    purchased_at: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    address_book_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  Order.associate = function(models) {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    Order.belongsTo(models.Address_book, {
      foreignKey: 'address_book_id'
    });
    Order.hasMany(models.Order_menu, {
      foreignKey: 'order_id'
    });
  }
  return Order;
};
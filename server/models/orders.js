'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  orders.init({
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
    modelName: 'orders',
  });
  orders.associate = function(models) {
    orders.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
    orders.belongsTo(models.address_books, {
      foreignKey: 'address_book_id'
    });
    orders.hasMany(models.orders_menus, {
      foreignKey: 'order_id'
    });
  }
  return orders;
};
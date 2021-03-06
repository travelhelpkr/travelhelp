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
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      this.belongsTo(models.Address_book, {
        foreignKey: 'address_book_id'
      });
      // by defining belongsToMany && hasMany together for N:M association, we can manipulate all kind of eager loading from this relationship.
      this.belongsToMany(models.Menu, {
        through: models.Order_menu,
        foreignKey: 'order_id'
      });
      this.belongsToMany(models.Option, {
        through: models.Order_menu,
        foreignKey: 'order_id'
      });
      this.hasMany(models.Order_menu, {
        foreignKey: 'order_id'
      });
    }
  };
  Order.init({
    is_cart: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    purchased_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  
  return Order;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address_books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  address_books.init({
    address: DataTypes.STRING,
    postal_code: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'address_books',
  });
  address_books.associate = function(models) {
    address_books.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
    address_books.hasOne(models.orders, {
      foreignKey: 'address_book_id'
    });
  }
  return address_books;
};
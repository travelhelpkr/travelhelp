'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address_book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.belongsTo(models.User);
      this.hasMany(models.Order, {
        foreignKey: 'address_book_id'
      });
    }
  };
  Address_book.init({
    address: DataTypes.STRING,
    postal_code: DataTypes.INTEGER,
    contact: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address_book',
  });

  // Address_book.associate = function(models) {
  //   Address_book.belongsTo(models.User, {
  //     foreignKey: 'user_id'
  //   });
  //   Address_book.hasOne(models.Order, {
  //     foreignKey: 'address_book_id'
  //   });
  // }
  return Address_book;
};
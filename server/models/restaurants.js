'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class restaurants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  restaurants.init({
    name_en: DataTypes.STRING,
    name_zh: DataTypes.STRING,
    name_ja: DataTypes.STRING,
    category_en: DataTypes.STRING,
    category_zh: DataTypes.STRING,
    category_ja: DataTypes.STRING,
    description_en: DataTypes.STRING,
    description_zh: DataTypes.STRING,
    description_ja: DataTypes.STRING,
    operation_hour: DataTypes.STRING,
    minimum_price: DataTypes.INTEGER,
    delivery_fee: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'restaurants',
  });
  restaurants.associate = function(models) {
    restaurants.hasMany(models.menus, {
      foreignKey: 'restaurant_id'
    });
  }
  return restaurants;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  menus.init({
    image: DataTypes.BLOB,
    name_en: DataTypes.STRING,
    name_zh: DataTypes.STRING,
    name_ja: DataTypes.STRING,
    description_en: DataTypes.STRING,
    description_zh: DataTypes.STRING,
    description_ja: DataTypes.STRING,
    price: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'menus',
  });
  menus.associate = function(models) {
    menus.hasMany(models.orders_menus, {
      foreignKey: 'menu_id'
    });
    menus.belongsTo(models.restaurants, {
      foreignKey: 'restaurant_id'
    });
  }
  return menus;
};
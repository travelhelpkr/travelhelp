'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Restaurant, {
        foreignKey: 'restaurant_id'
      });

      this.belongsToMany(models.Order, {
        through: models.Order_menu,
        foreignKey: 'menu_id'
      });
      this.belongsToMany(models.Option, {
        through: models.Menu_option,
        foreignKey: 'menu_id'
      });
    }
  };
  Menu.init({
    image: DataTypes.STRING,
    name_en: DataTypes.STRING,
    name_zh: DataTypes.STRING,
    name_ja: DataTypes.STRING,
    description_en: DataTypes.STRING,
    description_zh: DataTypes.STRING,
    description_ja: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu',
  });

  return Menu;
};
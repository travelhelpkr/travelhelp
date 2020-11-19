'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu_option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Option, {
        foreignKey: 'option_id'
      });
      this.belongsTo(models.Menu, {
        foreignKey: 'menu_id'
      });
    }
  };
  Menu_option.init({
  }, {
    sequelize,
    modelName: 'Menu_option',
  });
  
  return Menu_option;
};
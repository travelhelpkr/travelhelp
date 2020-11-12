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
    }
  };
  Menu_option.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    menu_id: DataTypes.INTEGER,
    option_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu_option',
  });
  Menu_option.associate = function(models) {
    Menu_option.belongsTo(models.Menu, {
      foreignKey: 'menu_id'
    });
    Menu_option.belongsTo(models.Option, {
      foreignKey: 'option_id'
    });
  }
  return Menu_option;
};
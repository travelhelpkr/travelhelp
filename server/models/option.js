'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      // it's replaced as belongsToMany. Once tested and works well as expected, remove this code.
      // this.hasMany(models.Menu_option, {
      //   foreignKey: 'option_id'
      // });

      this.belongsToMany(models.Menu, {
        through: models.Menu_option,
        foreignKey: 'option_id'
      });
    }
  };
  Option.init({
    image: DataTypes.STRING,
    name_en: DataTypes.STRING,
    name_zh: DataTypes.STRING,
    name_ja: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Option',
  });

  // Option.associate = function(models) {
  //   Option.hasMany(models.Menu_option, {
  //     foreignKey: 'option_id'
  //   });
  // }
  return Option;
};
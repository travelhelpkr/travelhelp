'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_policy_agreed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    last_visited_at: DataTypes.DATE,
    language: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  users.associate = function(models) {
    users.hasMany(models.address_books, {
      foreignKey: 'user_id'
    });
    users.hasMany(models.orders, {
      foreignKey: 'user_id'
    });
  }
  return users;
};
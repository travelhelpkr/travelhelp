'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
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
    oauth_provider: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'local'
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
    visit_count: DataTypes.INTEGER,
    language: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.associate = function(models) {
    User.hasMany(models.Address_book, {
      foreignKey: 'user_id'
    });
    User.hasMany(models.Order, {
      foreignKey: 'user_id'
    });
  }
  return User;
};
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_en: {
        type: Sequelize.STRING
      },
      name_zh: {
        type: Sequelize.STRING
      },
      name_ja: {
        type: Sequelize.STRING
      },
      category_en: {
        type: Sequelize.STRING
      },
      category_zh: {
        type: Sequelize.STRING
      },
      category_ja: {
        type: Sequelize.STRING
      },
      description_en: {
        type: Sequelize.STRING
      },
      description_zh: {
        type: Sequelize.STRING
      },
      description_ja: {
        type: Sequelize.STRING
      },
      operation_hour: {
        type: Sequelize.STRING
      },
      minimum_price: {
        type: Sequelize.INTEGER
      },
      delivery_fee: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Restaurants');
  }
};
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
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
      description_en: {
        type: Sequelize.STRING
      },
      description_zh: {
        type: Sequelize.STRING
      },
      description_ja: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Restaurants',
          key: 'id'
        }
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
    await queryInterface.dropTable('Menus');
  }
};
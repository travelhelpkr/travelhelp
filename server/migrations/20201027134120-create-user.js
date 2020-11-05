'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_policy_agreed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      last_visited_at: {
        type: Sequelize.DATE
      },
      visit_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      language: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};
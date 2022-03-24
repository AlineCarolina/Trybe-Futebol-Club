'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      role: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      email: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      password: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
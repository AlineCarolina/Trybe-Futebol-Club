'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      home_team_goals: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      away_team: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      away_team_goals: {
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
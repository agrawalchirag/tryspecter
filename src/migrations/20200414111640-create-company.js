"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("companies", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      domain_name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      linkedin_url: {
        type: Sequelize.STRING,
      },
      twitter_url: {
        type: Sequelize.STRING,
      },
      facebook_url: {
        type: Sequelize.STRING,
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      error: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("companies");
  },
};

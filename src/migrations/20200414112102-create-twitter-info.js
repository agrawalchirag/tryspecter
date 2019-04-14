"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("twitter_infos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      twitter_url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      tweets: {
        type: Sequelize.STRING,
      },
      following: {
        type: Sequelize.STRING,
      },
      followers: {
        type: Sequelize.STRING,
      },
      favourites: {
        type: Sequelize.STRING,
      },
      joined_date: {
        type: Sequelize.STRING,
      },
      location: {
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
      domain_name: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "companies",
          key: "domain_name",
          onUpdate: "cascade",
          onDelete: "cacade",
        },
      },
      twitter_hash: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
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
    return queryInterface.dropTable("twitter_infos");
  },
};

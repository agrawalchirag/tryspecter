"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("fb_infos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      facebook_url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      likes: {
        type: Sequelize.STRING,
      },
      followers: {
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
      facebook_hash: {
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
    return queryInterface.dropTable("fb_infos");
  },
};

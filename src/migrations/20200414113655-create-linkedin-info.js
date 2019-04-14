"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("linkedin_infos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      linkedin_url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      industry_type: {
        type: Sequelize.STRING,
      },
      company_size: {
        type: Sequelize.STRING,
      },
      linkedin_employees: {
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
      linkedin_hash: {
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
    return queryInterface.dropTable("linkedin_infos");
  },
};

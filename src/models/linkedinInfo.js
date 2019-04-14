"use strict";

module.exports = (sequelize, DataTypes) => {
  const linkedin_infos = sequelize.define("linkedin_infos", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    linkedin_url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    industry_type: {
      type: DataTypes.STRING,
    },
    company_size: {
      type: DataTypes.STRING,
    },
    linkedin_employees: {
      type: DataTypes.STRING,
    },
    timestamp: {
      allowNull: false,
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    error: {
      type: DataTypes.STRING,
    },
    domain_name: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: "companies",
        key: "domain_name",
        onUpdate: "cascade",
        onDelete: "cacade",
      },
    },
    linkedin_hash: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  linkedin_infos.associate = function (models) {
    linkedin_infos.belongsTo(models.companies, {
      foreignKey: "domain_name",
      sourceKey: "domain_name",
      targetKey: "domain_name",
    });
  };
  return linkedin_infos;
};

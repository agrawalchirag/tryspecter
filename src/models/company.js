"use strict";

module.exports = (sequelize, DataTypes) => {
  const companies = sequelize.define("companies", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    domain_name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    linkedin_url: {
      type: DataTypes.STRING,
    },
    twitter_url: {
      type: DataTypes.STRING,
    },
    facebook_url: {
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  companies.associate = function (models) {
    companies.hasMany(models.twitter_infos, {
      foreignKey: "domain_name",
      sourceKey: "domain_name",
      targetKey: "domain_name",
    });
    companies.hasMany(models.fb_infos, {
      foreignKey: "domain_name",
      sourceKey: "domain_name",
      targetKey: "domain_name",
    });
  };
  return companies;
};

"use strict";

module.exports = (sequelize, DataTypes) => {
  const twitter_infos = sequelize.define("twitter_infos", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    twitter_url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    tweets: {
      type: DataTypes.STRING,
    },
    following: {
      type: DataTypes.STRING,
    },
    followers: {
      type: DataTypes.STRING,
    },
    favourites: {
      type: DataTypes.STRING,
    },
    joined_date: {
      type: DataTypes.STRING,
    },
    location: {
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
    twitter_hash: {
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
  twitter_infos.associate = function (models) {
    twitter_infos.belongsTo(models.companies, {
      foreignKey: "domain_name",
      sourceKey: "domain_name",
      targetKey: "domain_name",
    });
  };
  return twitter_infos;
};

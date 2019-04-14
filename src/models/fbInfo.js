"use strict";

module.exports = (sequelize, DataTypes) => {
  const fb_infos = sequelize.define("fb_infos", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    facebook_url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.STRING,
    },
    followers: {
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
    facebook_hash: {
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
  fb_infos.associate = function (models) {
    fb_infos.belongsTo(models.companies, {
      foreignKey: "domain_name",
      sourceKey: "domain_name",
      targetKey: "domain_name",
    });
  };
  return fb_infos;
};

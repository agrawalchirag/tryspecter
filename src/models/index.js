"use strict";
const { config } = require("../config/app");

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const db_config = {
  username: config.get("postgres.username"),
  password: config.get("postgres.password"),
  database: config.get("postgres.database"),
  host: config.get("postgres.host"),
  dialect: config.get("postgres.dialect"),
  operatorsAliases: config.get("postgres.operatorAliases"),
  logging: true,
};

const db = {};
let sequelize;

if (db_config.use_env_variable) {
  sequelize = new Sequelize(process.env[db_config.use_env_variable], db_config);
} else {
  sequelize = new Sequelize(
    db_config.database,
    db_config.username,
    db_config.password,
    db_config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    console.log("Model name----", model);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

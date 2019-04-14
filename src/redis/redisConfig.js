const { URL } = require("url");
const { config } = require("../config/app");

const REDIS_URL = config.get("redis.endpoint");
const redisURLObject = new URL(REDIS_URL);

const redisConfig = {
  port: redisURLObject.port,
  host: redisURLObject.hostname,
  db: 0,
  password: redisURLObject.password,
};

if (redisURLObject.protocol === "rediss:") {
  redisConfig["tls"] = { servername: redisURLObject.hostname };
}

module.exports = { redisConfig };

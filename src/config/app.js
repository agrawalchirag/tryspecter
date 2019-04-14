const convict = require("convict");

const config = convict({
  postgres: {
    database: {
      doc: "Database Name",
      format: String,
      default: "tryspecter",
      env: "DB_NAME",
      sensitive: true,
    },
    password: {
      doc: "Database Password",
      format: String,
      default: "postgres",
      env: "DB_PASSWORD",
      sensitive: true,
    },
    username: {
      doc: "Database User Name",
      format: String,
      default: "postgres",
      env: "DB_USER",
      sensitive: true,
    },
    operatorAliases: {
      doc: "Database Operator alias",
      format: Boolean,
      default: false,
      env: "DB_OPERATORS_ALIASES",
      sensitive: true,
    },
    host: {
      doc: "Database host",
      format: String,
      default: "postgres",
      env: "DB_HOST",
      sensitive: true,
    },
    dialect: {
      doc: "Database dialect",
      format: String,
      default: "postgres",
      env: "DB_DIALECT",
      sensitive: true,
    },
  },

  file: {
    domainFileName: {
      doc: "Domain csv file name",
      format: String,
      default: "",
      env: "DOMAIN_FILE_NAME",
    },
  },

  user: {
    userAgent: {
      doc: "user agent",
      format: String,
      default: "",
      env: "USER_AGENT",
    },
  },

  queue: {
    getUrlQueueName: {
      doc: "Get Url queue name",
      format: String,
      default: "get-url-queue",
      env: "GET_URL_QUEUE_NAME",
    },
    getFbInfoQueueName: {
      doc: "Get fb info queue name",
      format: String,
      default: "get-fb-info-queue",
      env: "GET_FB_INFO_QUEUE_NAME",
    },
    getTwitterInfoQueueName: {
      doc: "Get twitter info queue name",
      format: String,
      default: "get-twitter-info-queue",
      env: "GET_TWITTER_INFO_QUEUE_NAME",
    },
    getLinkedinInfoQueueName: {
      doc: "Get linkedin info queue name",
      format: String,
      default: "get-linkedin-info-queue",
      env: "GET_LINKEDIN_INFO_QUEUE_NAME",
    },
    getUrlQueueConcurrency: {
      doc: "Get Url queue concurrency",
      format: Number,
      default: 1,
      env: "GET_URL_QUEUE_CONCURRENCY",
    },
    getFbInfoQueueConcurrency: {
      doc: "Get fb info queue concurrency",
      format: Number,
      default: 1,
      env: "GET_FB_INFO_QUEUE_CONCURRENCY",
    },
    getTwitterInfoQueueConcurrency: {
      doc: "Get twitter info queue concurrency",
      format: Number,
      default: 1,
      env: "GET_TWITTER_INFO_QUEUE_CONCURRENCY",
    },
    getLinkedinInfoQueueConcurrency: {
      doc: "Get linkedin info queue concurrency",
      format: Number,
      default: 1,
      env: "GET_LINKEDIN_INFO_QUEUE_CONCURRENCY",
    },
  },

  cron: {
    schedularCronTime: {
      doc: "schedular cron time",
      default: "",
      format: Number,
      env: "SCHEDULAR_CRON_TIME",
    },
  },

  redis: {
    endpoint: {
      doc: "Redis endpoint url",
      format: String,
      default: "",
      env: "REDIS_ENDPOINT",
    },
  },
});

console.log("Starting service with ", config.toString());

config.validate({ allowed: "strict" });

module.exports = { config };

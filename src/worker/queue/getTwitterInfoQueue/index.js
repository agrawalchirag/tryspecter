const Queue = require("bull");

const { redisConfig } = require("../../../redis/redisConfig");
const { scrapperAdapter } = require("../../../scrappers/baseScrapper");
const { createOrUpdateTwitterInfo } = require("../../../dbHelper");
const { toSha256 } = require("../../../utility");
const { config } = require("../../../config/app");

const getTwitterInfoQueueName = config.get("queue.getTwitterInfoQueueName");
const getTwitterInfoQueue = new Queue(getTwitterInfoQueueName, {
  redis: redisConfig,
});
const concurrency = config.get("queue.getTwitterInfoQueueConcurrency");

const addJobToGetTwitterInfoQueue = async (data) => {
  const { domainName, twitterUrl } = data;
  const jobId = `${getTwitterInfoQueueName}-${twitterUrl}`;
  getTwitterInfoQueue.add(
    {
      domainName,
      twitterUrl,
    },
    {
      jobId,
      removeOnComplete: true,
      attempts: 2,
      backoff: 60000,
    }
  );
};

const runGetTwitterInfoQueue = () => {
  console.log(`Running get twitter info queue`);
  getTwitterInfoQueue.process(concurrency, processGetTwitterInfoQueue);
};

const processGetTwitterInfoQueue = async (job, jobDone) => {
  const { domainName, twitterUrl } = job.data;
  try {
    const data = await scrapperAdapter["TWITTER_SCRAPPER"](twitterUrl);
    const { timestamp } = data;
    const twitterHash = toSha256(twitterUrl + timestamp);

    data.twitterUrl = twitterUrl;
    data.domainName = domainName;
    data.twitterHash = twitterHash;
    await createOrUpdateTwitterInfo(data);
    jobDone();
  } catch (error) {
    console.log(
      `Error while processing twitter url: ${twitterUrl} ${error.message}`
    );
    if (job.attemptsMade === 1) {
      const timestamp = +new Date();
      const data = {
        domainName,
        twitterUrl,
        username: null,
        tweets: null,
        followers: null,
        following: null,
        favourites: null,
        location: null,
        joinedDate: null,
        timestamp,
        twitterHash: toSha256(twitterUrl + timestamp),
        error: error.message,
      };
      await createOrUpdateTwitterInfo(data);
    }
    jobDone(error, null);
  }
};

module.exports = {
  addJobToGetTwitterInfoQueue,
  processGetTwitterInfoQueue,
  runGetTwitterInfoQueue,
};

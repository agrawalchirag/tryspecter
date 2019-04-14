const Queue = require("bull");

const { redisConfig } = require("../../../redis/redisConfig");
const { scrapperAdapter } = require("../../../scrappers/baseScrapper");
const { createOrUpdateFbInfo } = require("../../../dbHelper");
const { toSha256 } = require("../../../utility");
const { config } = require("../../../config/app");

const getFbInfoQueueName = config.get("queue.getFbInfoQueueName");
const getFbInfoQueue = new Queue(getFbInfoQueueName, { redis: redisConfig });
const concurrency = config.get("queue.getFbInfoQueueConcurrency");

const addJobToGetFbInfoQueue = async (data) => {
  const { domainName, facebookUrl } = data;
  const jobId = `${getFbInfoQueueName}-${facebookUrl}`;
  getFbInfoQueue.add(
    {
      domainName,
      facebookUrl,
    },
    {
      jobId,
      removeOnComplete: true,
      attempts: 2,
      backoff: 60000,
    }
  );
};

const runGetFbInfoQueue = () => {
  console.log(`Running get fb info queue`);
  getFbInfoQueue.process(concurrency, processGetFbInfoQueue);
};

const processGetFbInfoQueue = async (job, jobDone) => {
  const { domainName, facebookUrl } = job.data;
  try {
    const data = await scrapperAdapter["FACEBOOK_SCRAPPER"](facebookUrl);
    const { timestamp } = data;
    const facebookHash = toSha256(facebookUrl + timestamp);

    data.facebookUrl = facebookUrl;
    data.domainName = domainName;
    data.facebookHash = facebookHash;
    await createOrUpdateFbInfo(data);
    jobDone();
  } catch (error) {
    console.log(
      `Error while processing facebook url: ${facebookUrl} ${error.message}`
    );
    if (job.attemptsMade === 1) {
      const timestamp = +new Date();
      const data = {
        domainName,
        facebookUrl,
        likes: null,
        followers: null,
        timestamp,
        facebookHash: toSha256(facebookUrl + timestamp),
        error: error.message,
      };
      await createOrUpdateFbInfo(data);
    }
    jobDone(error, null);
  }
};

module.exports = {
  addJobToGetFbInfoQueue,
  processGetFbInfoQueue,
  runGetFbInfoQueue,
};

const Queue = require("bull");

const { redisConfig } = require("../../../redis/redisConfig");
const { createOrUpdateCompany } = require("../../../dbHelper");
const { config } = require("../../../config/app");

const { scrapperAdapter } = require("../../../scrappers/baseScrapper");

const { addJobToGetTwitterInfoQueue } = require("../getTwitterInfoQueue");
const { addJobToGetFbInfoQueue } = require("../getFbInfoQueue");
const { addJobToGetLinkedinInfoQueue } = require("../getLinkedinInfoQueue");

const getUrlQueueName = config.get("queue.getUrlQueueName");
const getUrlQueue = new Queue(getUrlQueueName, { redis: redisConfig });
const concurrency = config.get("queue.getUrlQueueConcurrency");

const addJobToGetUrlQueue = async (data) => {
  const { domainName } = data;
  const jobId = `${getUrlQueueName}-${domainName}`;
  getUrlQueue.add(
    {
      domainName,
    },
    {
      jobId,
      removeOnComplete: true,
      attempts: 2,
      backoff: 60000,
    }
  );
};

const runGetUrlQueue = () => {
  console.log(`Running get url queue`);
  getUrlQueue.process(concurrency, processGetUrlQueue);
};

const processGetUrlQueue = async (job, jobDone) => {
  const { domainName } = job.data;

  try {
    const data = await scrapperAdapter["COMPANY_SCRAPPER"](domainName);

    const { fullDomainName, twitterUrl, facebookUrl, linkedinUrl } = data;
    await createOrUpdateCompany(data);
    if (twitterUrl) {
      addJobToGetTwitterInfoQueue({ domainName: fullDomainName, twitterUrl });
    }
    if (facebookUrl) {
      addJobToGetFbInfoQueue({ domainName: fullDomainName, facebookUrl });
    }
    if (linkedinUrl) {
      addJobToGetLinkedinInfoQueue({domainName: fullDomainName, linkedinUrl});
    }
    jobDone();
  } catch (error) {
    console.log(
      `Error while processing domain name: ${domainName} ${error.message}`
    );
    if (job.attemptsMade === 1) {
      const data = {
        fullDomainName: `${domainName}`,
        twitterUrl: null,
        linkedinUrl: null,
        facebookUrl: null,
        timestamp: +new Date(),
        error: error.message,
      };
      await createOrUpdateCompany(data);
    }
    jobDone(error, null);
  }
};

module.exports = { addJobToGetUrlQueue, processGetUrlQueue, runGetUrlQueue };

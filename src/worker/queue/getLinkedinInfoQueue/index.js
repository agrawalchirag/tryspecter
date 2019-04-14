const Queue = require("bull");

const { redisConfig } = require("../../../redis/redisConfig");
const { scrapperAdapter } = require("../../../scrappers/baseScrapper");
const { createOrUpdateLinkedinInfo } = require("../../../dbHelper");
const { toSha256 } = require("../../../utility");
const { config } = require("../../../config/app");

const getLinkedinInfoQueueName = config.get("queue.getLinkedinInfoQueueName");
const getLinkedinInfoQueue = new Queue(getLinkedinInfoQueueName, {
  redis: redisConfig,
});
const concurrency = config.get("queue.getLinkedinInfoQueueConcurrency");

const addJobToGetLinkedinInfoQueue = async (data) => {
  const { domainName, linkedinUrl } = data;
  const jobId = `${getLinkedinInfoQueueName}-${linkedinUrl}`;
  getLinkedinInfoQueue.add(
    {
      domainName,
      linkedinUrl,
    },
    {
      jobId,
      removeOnComplete: true,
      attempts: 2,
      backoff: 60000,
    }
  );
};

const runGetLinkedinInfoQueue = () => {
  console.log(`Running get linkedin info queue`);
  getLinkedinInfoQueue.process(concurrency, processGetLinkedinInfoQueue);
};

const processGetLinkedinInfoQueue = async (job, jobDone) => {
  const { domainName, linkedinUrl } = job.data;
  try {
    const data = await scrapperAdapter["LINKEDIN_SCRAPPER"](linkedinUrl);
    const { timestamp } = data;
    const linkedinHash = toSha256(linkedinUrl + timestamp);

    data.linkedinUrl = linkedinUrl;
    data.domainName = domainName;
    data.linkedinHash = linkedinHash;
    await createOrUpdateLinkedinInfo(data);
    jobDone();
  } catch (error) {
    console.log(
      `Error while processing linkedin url: ${linkedinUrl} ${error.message}`
    );
    if (job.attemptsMade === 1) {
      const timestamp = +new Date();
      const data = {
        domainName,
        linkedinUrl,
        industryType: null,
        companySize: null,
        linkedinEmp: null,
        timestamp,
        linkedinHash: toSha256(linkedinUrl + timestamp),
        error: error.message,
      };
      await createOrUpdateLinkedinInfo(data);
    }
    jobDone(error, null);
  }
};

module.exports = {
  addJobToGetLinkedinInfoQueue,
  processGetLinkedinInfoQueue,
  runGetLinkedinInfoQueue,
};

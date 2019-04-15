const SHA256 = require("crypto-js/sha256");

const { addJobToGetUrlQueue } = require("./worker/queue/getUrlQueue");

const addDataToQueue = async (domainNames) => {
  for (const domainName of domainNames) {
    addJobToGetUrlQueue({ domainName });
  }
};

const toSha256 = (value) => {
  return SHA256(value).toString();
};

const pathToExtension = require("path").join(__dirname, "abp_chrome");
console.log(pathToExtension);

module.exports = {addDataToQueue, toSha256, pathToExtension };

const csv = require("csvtojson");

const { config } = require("./config/app");

const csvToJson = async () => {
  const fileName = config.get("file.domainFileName");
  return await csv().fromFile(fileName);
};

module.exports = { csvToJson };

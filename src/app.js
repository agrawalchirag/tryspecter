const _ = require("lodash");

const { csvToJson } = require("./fileUtility");
const { addDataToQueue } = require("./utility");
const db = require("./models");
const { startSchedular } = require("./schedular");

(async () => {
  try {
    await db.sequelize.sync();
    const parsedJsonArray = await csvToJson();

    const domainNames = _.map(parsedJsonArray, "domain");
    await addDataToQueue(domainNames);

    startSchedular();
  } catch (error) {
    console.log(error);
  }
})();

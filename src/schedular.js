const { config } = require("./config/app");
const { getAllDomainNames } = require("./dbHelper");
const { addDataToQueue } = require("./utility");

const delayTime = config.get("cron.schedularCronTime");

const schedular = async () => {
  console.log("schedular called");
  const domainNames = await getAllDomainNames();
  await addDataToQueue(domainNames);
};

const startSchedular = () => {
  setInterval(schedular, delayTime);
};

module.exports = { startSchedular };
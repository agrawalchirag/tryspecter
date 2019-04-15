const puppeteer = require("puppeteer");

const { pathToExtension } = require("../utility");

const getBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      "--no-sandbox",
    ],
  });

  return { browser };
};

module.exports = { getBrowser };

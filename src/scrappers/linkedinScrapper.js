const puppeteer = require("puppeteer");

require('dotenv').config();

const { pathToExtension } = require("../utility");

const {config} = require("../config/app");
const user_agent = config.get("user.userAgent");

const getLinkedinData = async (linkedinUrl) => {
  let updatedLinkedUrl = null;
  if (linkedinUrl.endsWith("/")) {
    updatedLinkedUrl = `${linkedinUrl}about`;
  } else {
    updatedLinkedUrl = `${linkedinUrl}/about`;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      "--no-sandbox",
    ],
  });

  const page = await browser.newPage();
  await page.setUserAgent(user_agent);

  await page.goto("https:/www.linkedin.com/login", {
    waitUntil: "networkidle0",
  });

  await page.type("#username", process.env.USERNAME);
  await page.type("#password", process.env.PASSWORD);
  // click and wait for navigation
  await Promise.all([
    page.click(".btn__primary--large.from__button--floating"),
    page.waitForNavigation({ timeout: 0 }),
  ]);

  await page.goto(updatedLinkedUrl, {
    timeout: 0,
  });

  const industryTypeElement = await page.$(
    ".org-top-card-summary-info-list__info-item"
  );
  const industryType = (
    await page.evaluate(
      (industryTypeElement) => industryTypeElement.textContent,
      industryTypeElement
    )
  ).trim();

  const companySizeElement = await page.$(
    ".org-about-company-module__company-size-definition-text"
  );
  const companySize = (
    await page.evaluate(
      (companySizeElement) => companySizeElement.textContent,
      companySizeElement
    )
  ).trim();

  const linkedinEmpElement = await page.$(
    ".org-page-details__employees-on-linkedin-count"
  );
  const linkedinEmp = (
    await page.evaluate(
      (linkedinEmpElement) => linkedinEmpElement.textContent,
      linkedinEmpElement
    )
  )
    .trim()
    .split("\n")[0];

  await browser.close();
  return { industryType, companySize, linkedinEmp, timestamp: +new Date(), error: null };
};

module.exports = { getLinkedinData };

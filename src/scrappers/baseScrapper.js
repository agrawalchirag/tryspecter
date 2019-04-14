const { getCompanyData } = require("./socialLinksScrapper");
const { getTwitterData } = require("./twitterScrapper");
const { getFacebookData } = require("./facebookScrapper");
const {getLinkedinData} = require("./linkedinScrapper");

const scrapperAdapter = {
  COMPANY_SCRAPPER: getCompanyData,
  TWITTER_SCRAPPER: getTwitterData,
  FACEBOOK_SCRAPPER: getFacebookData,
  LINKEDIN_SCRAPPER: getLinkedinData,
};

module.exports = { scrapperAdapter };

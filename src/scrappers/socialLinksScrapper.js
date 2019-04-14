const axios = require("axios");

const fetchData = async (domainName) => {
  const result = await axios.get(domainName);
  return result.data;
};

const twitterPattern = new RegExp(`"(https|http)://(|in.|www.)twitter.com.*?"`);
const facebookPatternLink = new RegExp(
  `href="(https|http)://(|in.|www.)facebook.com.*?"`
);
const facebookPattern = new RegExp(
  `"(https|http)://(|in.|www.)facebook.com.*?"`
);
const linkedinPattern = new RegExp(
  `"(https|http)://(|in.|www.)linkedin.com.*?"`
);

const getCompanyData = async (domainName) => {
  const fullDomainName = `https://www.` + domainName;

  const data = await fetchData(fullDomainName);

  const twitterResult = twitterPattern.exec(data);
  let facebookResult = facebookPatternLink.exec(data);
  const linkedinResult = linkedinPattern.exec(data);

  let twitterUrl = null;
  let linkedinUrl = null;
  let facebookUrl = null;

  if (twitterResult) {
    twitterUrl = twitterResult[0].replace(/['"]+/g, "");
  }
  if (!facebookResult) {
    facebookResult = facebookPattern.exec(data);
    if (facebookResult) {
      facebookUrl = facebookResult[0].replace(/['"]+/g, "");
    }
  } else {
    facebookUrl = facebookResult[0].substring(5).replace(/['"]+/g, "");
  }
  if (linkedinResult) {
    linkedinUrl = linkedinResult[0].replace(/['"]+/g, "");
  }
  return {
    fullDomainName: domainName,
    twitterUrl,
    linkedinUrl,
    facebookUrl,
    timestamp: +new Date(),
    error: null,
  };
};

module.exports = { getCompanyData };

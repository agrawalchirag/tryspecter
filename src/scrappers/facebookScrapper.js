const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async (facebookUrl) => {
  const result = await axios.get(facebookUrl);
  return cheerio.load(result.data);
};

const getFacebookData = async (facebookUrl) => {
  let updatedFacebookUrl = null;
  if (facebookUrl.startsWith(`https`)) {
    updatedFacebookUrl = `${facebookUrl.slice(0, 8)}en-gb.${facebookUrl.slice(
      8
    )}`;
  } else {
    updatedFacebookUrl = `${facebookUrl.slice(0, 7)}en-gb.${facebookUrl.slice(
      7
    )}`;
  }
  updatedFacebookUrl = updatedFacebookUrl.replace("www.", "");

  const $ = await fetchData(updatedFacebookUrl);

  const content = $("._4bl9").text().trim();

  let likes = null;
  let followers = null;

  try {
    if (content !== "") {
      likes = content.split(" ")[4].replace("help", "");
      followers = content.split(" ")[7].replace("this", "");
    }
  } catch (error) {
    return {
      likes: null,
      followers: null,
      timestamp: +new Date(),
      error: null,
    };
  }

  return { likes, followers, timestamp: +new Date(), error: null };
};

module.exports = { getFacebookData };

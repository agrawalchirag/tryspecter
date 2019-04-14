const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async (twitterUrl) => {
  const result = await axios.get(twitterUrl);
  return cheerio.load(result.data);
};

const getTwitterData = async (twitterUrl) => {
  const $ = await fetchData(twitterUrl);

  const username = $(
    ".ProfileCardMini-screenname > .ProfileCardMini-screennameLink > .username"
  )
    .text()
    .trim();
  const tweets = $(
    ".ProfileNav > .ProfileNav-list > .ProfileNav-item--tweets > .ProfileNav-stat > .ProfileNav-value"
  )
    .text()
    .trim();

  const following = $(
    ".ProfileNav > .ProfileNav-list > .ProfileNav-item--following > .ProfileNav-stat > .ProfileNav-value"
  )
    .text()
    .trim();
  const followers = $(
    ".ProfileNav > .ProfileNav-list > .ProfileNav-item--followers > .ProfileNav-stat > .ProfileNav-value"
  )
    .text()
    .trim();
  const favourites = $(
    ".ProfileNav > .ProfileNav-list > .ProfileNav-item--favorites > .ProfileNav-stat > .ProfileNav-value"
  )
    .text()
    .trim();

  const location = $(
    ".ProfileHeaderCard-location > .ProfileHeaderCard-locationText"
  )
    .text()
    .trim();
  const joinedDate = $(
    ".ProfileHeaderCard-joinDate > .ProfileHeaderCard-joinDateText"
  )
    .text()
    .trim();

  return {
    username,
    tweets,
    followers,
    following,
    favourites,
    location,
    joinedDate,
    timestamp: +new Date(),
    error: null,
  };
};

module.exports = { getTwitterData };

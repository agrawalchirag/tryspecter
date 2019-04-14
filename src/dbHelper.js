const _ = require("lodash");

const db = require("./models");

const createOrUpdateCompany = async (data) => {
  const {
    fullDomainName: domain_name,
    linkedinUrl: linkedin_url,
    twitterUrl: twitter_url,
    facebookUrl: facebook_url,
    timestamp,
    error,
  } = data;
  await db.companies.upsert({
    domain_name,
    linkedin_url,
    twitter_url,
    facebook_url,
    timestamp,
    error,
  });
};

const createOrUpdateLinkedinInfo = async (data) => {
  const {
    companySize: company_size,
    industryType: industry_type,
    linkedinEmp: linkedin_employees,
    timestamp,
    linkedinUrl: linkedin_url,
    domainName: domain_name,
    linkedinHash: linkedin_hash,
    error,
  } = data;
  await db.linkedin_infos.upsert({
    industry_type,
    company_size,
    linkedin_employees,
    linkedin_url,
    domain_name,
    timestamp,
    linkedin_hash,
    error,
  });
};

const createOrUpdateTwitterInfo = async (data) => {
  const {
    username,
    tweets,
    following,
    followers,
    favourites,
    location,
    joinedDate: joined_date,
    timestamp,
    twitterUrl: twitter_url,
    domainName: domain_name,
    twitterHash: twitter_hash,
    error,
  } = data;
  await db.twitter_infos.upsert({
    username,
    tweets,
    following,
    followers,
    favourites,
    location,
    joined_date,
    timestamp,
    twitter_url,
    domain_name,
    twitter_hash,
    error,
  });
};

const createOrUpdateFbInfo = async (data) => {
  const {
    domainName: domain_name,
    facebookUrl: facebook_url,
    likes,
    followers,
    timestamp,
    facebookHash: facebook_hash,
    error,
  } = data;
  await db.fb_infos.upsert({
    domain_name,
    facebook_url,
    likes,
    followers,
    timestamp,
    facebook_hash,
    error,
  });
};

const getAllDomainNames = async () => {
  const companies = await db.companies.findAll({
    raw: true,
  });
  return _.map(companies, "domain_name");
};

module.exports = {
  createOrUpdateCompany,
  createOrUpdateTwitterInfo,
  createOrUpdateFbInfo,
  getAllDomainNames,
  createOrUpdateLinkedinInfo,
};

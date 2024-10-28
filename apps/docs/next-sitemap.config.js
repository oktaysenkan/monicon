/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://monicon-docs.vercel.app",
  generateRobotsTxt: true,
};

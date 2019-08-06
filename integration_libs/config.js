// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  dev_endpoint: process.env.API_URL_DEV,
  prod_endpoint: process.env.API_URL_PROD,
  dev_token: process.env.API_KEY_DEV,
  prod_token: process.env.API_KEY_PROD,
  is_production:process.env.IS_PRODUCTION,
  port: process.env.PORT
};

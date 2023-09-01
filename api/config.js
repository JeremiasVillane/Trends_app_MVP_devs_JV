require("dotenv").config();
const DEFAULT_IMG = "https://i.postimg.cc/J4QGQWmr/user-default.png";
const DEFAULT_IMG_GROUP = "https://i.postimg.cc/NG6tFfyr/group-default.jpg";

const {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  NODE_ENV,
  SV_HOST,
  SV_PORT,
  CL_URL,
  JWT_KEY,
  CRYPTO_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

module.exports = {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  DEFAULT_IMG,
  DEFAULT_IMG_GROUP,
  NODE_ENV,
  SV_HOST,
  SV_PORT,
  CL_URL,
  JWT_KEY,
  CRYPTO_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
};

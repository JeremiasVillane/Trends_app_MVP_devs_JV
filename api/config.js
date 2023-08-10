require("dotenv").config();
const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80";

const {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  NODE_ENV,
  SV_HOST,
  SV_PORT,
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
  NODE_ENV,
  SV_HOST,
  SV_PORT,
  JWT_KEY,
  CRYPTO_KEY,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
};
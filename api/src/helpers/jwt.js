const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../config");

const createToken = async (payload) => {
  // console.log(payload);
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_KEY, (error, token) => { //{ expiresIn: "2h" },
      if (error) reject({ ...error, message: "Could not create token." });
      resolve(token);
    });
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_KEY, (error, decoded) => {
      if (error)
        reject({ ...error, message: "Invalid token. Authorization denied." });
      resolve(decoded);
    });
  });
};

module.exports = { createToken, verifyToken };

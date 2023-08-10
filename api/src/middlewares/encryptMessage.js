const CryptoJS = require("crypto-js");
const { CRYPTO_KEY } = require("../../config");

// Middleware para la encriptación de los mensajes
const encryptMessage = (req, res, next) => {
  const { content: message } = req.body;

  const cryptedMessage = CryptoJS.AES.encrypt(message, CRYPTO_KEY).toString();

  req.body.content = cryptedMessage;

  next();
};

module.exports = encryptMessage;

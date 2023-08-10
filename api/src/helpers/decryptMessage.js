const CryptoJS = require("crypto-js");
const { CRYPTO_KEY } = require("../../config");

// Helper para la desencriptación de los mensajes
const decryptMessage = (encrypted) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encrypted, CRYPTO_KEY);
  const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
};

module.exports = decryptMessage;

const CryptoJS = require("crypto-js");
const { CRYPTO_KEY } = require("../../config");

/**
 * Este helper desencripta un mensaje encriptado utilizando 
 * el algoritmo AES y la clave de cifrado proporcionada.
 *
 * @param {string} encrypted - Mensaje encriptado que se desea desencriptar.
 * @returns {string} - Mensaje desencriptado en formato UTF-8.
 */

const decryptMessage = (encrypted) => {
  // Desencriptamos los bytes del mensaje encriptado utilizando la clave de cifrado.
  const decryptedBytes = CryptoJS.AES.decrypt(encrypted, CRYPTO_KEY);

  // Convertimos los bytes desencriptados a una cadena de texto en formato UTF-8.
  const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

  // Devolvemos el mensaje desencriptado en formato UTF-8.
  return decryptedMessage;
};

module.exports = decryptMessage;

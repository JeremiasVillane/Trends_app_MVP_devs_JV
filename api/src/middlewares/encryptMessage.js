const CryptoJS = require("crypto-js");
const { CRYPTO_KEY } = require("../../config");

/**
 * Middleware para la encriptación de los mensajes.
 * Toma el contenido del mensaje del cuerpo de la solicitud,
 * lo encripta usando el algoritmo AES con la clave de cifrado del archivo .env,
 * y actualiza pasa el mensaje encriptado en el cuerpo de la solicitud.
 */
const encryptMessage = (req, res, next) => {
  // Extraemos el contenido del mensaje del cuerpo de la solicitud.
  const { content: message } = req.body;

  // Encriptamos el mensaje usando el algoritmo AES y la clave de cifrado.
  const cryptedMessage = CryptoJS.AES.encrypt(message, CRYPTO_KEY).toString();

  // Actualizamos el contenido en el cuerpo de la solicitud con el mensaje encriptado.
  req.body.content = cryptedMessage;

  // Pasamos el control al siguiente middleware.
  next();
};

module.exports = encryptMessage;

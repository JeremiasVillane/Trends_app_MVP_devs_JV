import CryptoJS from "crypto-js";
const { VITE_CRYPTO_KEY } = import.meta.env;

/**
 * Conjunto de utilidades de seguridad criptográfica.
 */

// Clave utilizada para la encriptación y desencriptación de datos
const encryptionKey = VITE_CRYPTO_KEY;

/**
 * Encripta los datos utilizando el algoritmo AES.
 *
 * @param {Object} data - Datos a encriptar.
 * @returns {string} Datos encriptados en formato de cadena.
 */
const encryptData = (data) => {
  // Convierte los datos en formato JSON
  const jsonData = JSON.stringify(data);

  // Realiza la encriptación utilizando la clave de encriptación
  const encrypted = CryptoJS.AES.encrypt(jsonData, encryptionKey).toString();
  return encrypted;
};

/**
 * Desencripta los datos previamente encriptados.
 *
 * @param {string} encryptedData - Datos encriptados en formato de cadena.
 * @returns {Object|null} Datos desencriptados en formato JSON o null en caso de error.
 */
const decryptData = (encryptedData) => {
  // Realiza la desencriptación utilizando la clave de encriptación
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);

  // Convierte los bytes desencriptados a formato UTF-8
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  try {
    // Intenta analizar los datos desencriptados en formato JSON
    const jsonData = JSON.parse(decryptedData);

    return jsonData;
  } catch (error) {
    // Maneja errores de análisis JSON
    console.error("Error parsing JSON data:", error);
    return null;
  }
};

export { encryptionKey, encryptData, decryptData };

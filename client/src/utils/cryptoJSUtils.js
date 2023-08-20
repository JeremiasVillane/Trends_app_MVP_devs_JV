import CryptoJS from "crypto-js";
const { VITE_CRYPTO_KEY } = import.meta.env;

const encryptionKey = VITE_CRYPTO_KEY;

const encryptData = (data) => {
  const jsonData = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonData, encryptionKey).toString();
  return encrypted;
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  try {
    const jsonData = JSON.parse(decryptedData);
    return jsonData;
  } catch (error) {
    console.error("Error parsing JSON data:", error);
    return null;
  }
};

export { encryptionKey, encryptData, decryptData };

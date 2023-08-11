const messageFormatter = require("./messageFormatter");

/**
 * Este helper toma un objeto de chat o una matriz de objetos de chat como entrada,
 * formatea los mensajes en cada chat utilizando el helper messageFormatter,
 * y luego devuelve un nuevo objeto o matriz con solo los campos esenciales.
 *
 * @param {object | array} chat - Objeto de chat o matriz de objetos de chat.
 * @returns {object | array} - Objeto o matriz de chats formateados.
 */

const chatFormatter = (chat) => {
  // Si el parámetro chat es un objeto, lo convertimos
  // en una matriz para procesamiento uniforme.
  let inputchat = Array.isArray(chat) ? chat : [chat];
  let plainChats = [];

  // Iteramos a través de cada objeto de chat para aplicar el formato.
  inputchat.forEach((chat) => {
    // Formateamos los mensajes dentro de cada chat utilizando el helper messageFormatter.
    const plainMessages = messageFormatter(chat.messages);

    // Convertimos el objeto de chat en su representación JSON.
    const plainChat = chat.toJSON();

    // Reemplazamos el campo de mensajes con los mensajes formateados.
    plainChat.messages = plainMessages;

    // Eliminamos campos nulos o indefinidos del objeto de chat.
    for (const key in plainChat) {
      if (plainChat[key] === null || plainChat[key] === undefined) {
        delete plainChat[key];
      }
    }

    // Agregamos el chat formateado a la matriz de chats formateados.
    plainChats.push(plainChat);
  });

  // Devolvemos la matriz de chats formateados.
  return plainChats;
};

module.exports = chatFormatter;

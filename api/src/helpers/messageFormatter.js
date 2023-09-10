const decryptMessage = require("./decryptMessage");

/**
 * Este helper toma un array de mensajes como entrada,
 * aplica un formato específico a cada mensaje y desencripta
 * el contenido de cada mensaje utilizando el helper decryptMessage.
 *
 * Luego, devuelve un nuevo array de mensajes con solo los
 * campos esenciales y el contenido desencriptado.
 *
 * @param {array} messages - Array de mensajes a formatear y desencriptar.
 * @returns {array} - Array de mensajes formateados y con contenido desencriptado.
 */

const messageFormatter = (messages) => {
  // Si el parámetro messages es un array, lo dejamos como está;
  // de lo contrario, lo convertimos en un array.
  let inputMessages = Array.isArray(messages) ? messages : [messages];
  let outputMessages = [];

  // Iteramos a través de cada mensaje para aplicar el formato
  // y desencriptar el contenido.
  for (const message of inputMessages) {
    // Convertimos el objeto de mensaje en su representación JSON.
    const plainMessage = message.toJSON();
    
    // Creamos un nuevo objeto de mensaje con los campos
    // esenciales y contenido desencriptado.
    const outputMessage = {
      userId:
        plainMessage?.user?.id ||
        plainMessage?.sender_id ||
        plainMessage?.company_sender_id,
      name: plainMessage?.user?.name,
      username:
        plainMessage?.user?.username ||
        plainMessage.UserSender?.username ||
        plainMessage.CompanySender?.username,
      profile_image:
        plainMessage?.user?.profile_image ||
        plainMessage.UserSender?.profile_image ||
        plainMessage.CompanySender?.image,
      user_status:
        plainMessage?.user?.status ||
        plainMessage.UserSender?.status,
      messageId: plainMessage.message_id || plainMessage.id,
      createdAt: plainMessage.createdAt,
      content: decryptMessage(plainMessage.content),
      messageStatus: plainMessage.messageStatus,
    };

    // Eliminamos campos nulos o indefinidos del objeto de mensaje.
    for (const key in outputMessage) {
      if (outputMessage[key] === null || outputMessage[key] === undefined) {
        delete outputMessage[key];
      }
    }

    // Agregamos el mensaje formateado al array
    // de mensajes formateados y desencriptados.
    outputMessages.push(outputMessage);
  }

  // Ordenamos el array de mensajes por fecha de creación.
  outputMessages = outputMessages.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  // Devolvemos el array de mensajes formateados y desencriptados.
  return outputMessages;
};

module.exports = messageFormatter;

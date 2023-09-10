/**
 * Este helper toma una lista de mensajes como entrada y calcula
 * el número total de mensajes que tienen un estado de "sent" (enviado),
 * lo que indica que aún no han sido leídos por el destinatario.
 *
 * Devuelve el recuento total de mensajes no leídos.
 *
 * @param {array} messages - Lista de mensajes a analizar.
 * @returns {number} - Número total de mensajes no leídos.
 */

const noReadCounter = (userId, messages) => {
  // Inicializamos el contador en cero.
  let counter = 0;

  // Iteramos a través de la lista de mensajes y aumentamos 
  // el contador por cada mensaje con estado "sent" que no sea propio.
  messages.map(
    (msg) => (counter += msg.messageStatus === "sent" && msg.userId !== userId)
  );

  // Devolvemos el recuento total de mensajes no leídos.
  return counter;
};

module.exports = noReadCounter;

const { Chat, Message } = require("../../db");
const { Op } = require("sequelize");

module.exports = async (sender_id, receiver_id, content, userId, userType) => {
  // El mensaje se enviará solo si el id del remitente coincide con el del usuario
  // actualmente logueado o si se trata de un usuario tipo admin
  if (sender_id === userId || userType === "admin") {
    // Buscar un chat existente entre el remitente y el receptor
    let chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { user1_id: sender_id, user2_id: receiver_id },
          { user1_id: receiver_id, user2_id: sender_id },
        ],
      },
    });
    //console.log("chat:", chat)
    // Si no hay un chat existente, creemos uno nuevo
    if (!chat) {
      chat = await Chat.create({
        user1_id: sender_id,
        user2_id: receiver_id,
      });
    }
    // Crear el mensaje
    const message = await Message.create({
      chat_id: chat.chat_id,
      sender_id,
      receiver_id,
      content,
    });

    chat.updated_at = new Date();
    await chat.save();

    return message;
  }
  // Si el id del remitente no corresponde a un usuario
  // registrado y logueado, no tiene permisos para enviar mensajes.
  return { error: "Not authorized" };
};

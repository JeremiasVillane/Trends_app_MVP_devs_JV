const { Chat, Message } = require("../../db");
const { Op } = require("sequelize");
const decryptMessage = require("../../helpers/decryptMessage");
const { getUserById } = require("../search.controllers");

module.exports = async (sender_id, receiver_id, content, userId, userType) => {
  // El mensaje se enviará solo si el id del remitente coincide 
  // con el del usuario actualmente logueado
  if (sender_id === userId) {
    const foundSender = await getUserById(sender_id);

    if (!foundSender) {
      return { error: "Sender not found" };
    }

    const foundReceiver = await getUserById(receiver_id);

    if (!foundReceiver) {
      return { error: "Receiver not found" };
    }

    const senderType = foundSender.type;
    const receiverType = foundReceiver.type;
    let senderIdType;
    let receiverIdType;
    let messageSenderType;
    let messageReceiverType;
    let chat;

    if (["student", "professional", "company"].includes(userType)) {
      // Buscar un chat existente entre el remitente y el receptor, sin importar su tipo
      chat = await Chat.findOne({
        where: {
          [Op.or]: [
            { user1_id: sender_id, user2_id: receiver_id },
            { user1_id: receiver_id, user2_id: sender_id },
            { company1_id: sender_id, company2_id: receiver_id },
            { company1_id: receiver_id, company2_id: sender_id },
          ],
        },
      });
    } else {
      return { error: "Invalid user type" };
    }

    if (senderType === "company") {
      senderIdType = "company1_id";
      messageSenderType = "company_sender_id";
    } else {
      senderIdType = "user1_id";
      messageSenderType = "sender_id";
    }

    if (receiverType === "company") {
      receiverIdType = "company2_id"
      messageReceiverType = "company_receiver_id";
    } else {
      receiverIdType = "user2_id";
      messageReceiverType = "receiver_id";
    }

    // Si no hay un chat existente, creemos uno nuevo
    if (!chat) {
      chat = await Chat.create({
        [senderIdType]: sender_id,
        [receiverIdType]: receiver_id,
      });
    }

    // Crear el mensaje
    const message = await Message.create({
      chat_id: chat.chat_id,
      [messageSenderType]: sender_id,
      [messageReceiverType]: receiver_id,
      content,
    });

    chat.updated_at = new Date();
    await chat.save();

    message.content = decryptMessage(content);

    return message;
  }

  // Si el id del remitente no corresponde a un usuario
  // registrado y logueado, no tiene permisos para enviar mensajes.
  return { error: "Not authorized" };
};

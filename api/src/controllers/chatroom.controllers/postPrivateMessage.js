const { Chat, Message } = require("../../db");
const messageFormatter = require("../../helpers/messageFormatter");
const { getUserById } = require("../search.controllers");

module.exports = async (chatId, content, userId, userType) => {
  // Buscar un chat existente entre el remitente y el receptor, sin importar su tipo
  const chat = await Chat.findOne({
    where: { chat_id: chatId },
  });

  if (!chat) {
    return { error: "Private chat not found" };
  }

  const receiver_id = chat.user2_id;

  const foundReceiver = await getUserById(receiver_id);

  if (!foundReceiver) {
    return { error: "Receiver not found" };
  }

  const senderType = userType;
  const receiverType = foundReceiver.type;

  let senderIdType;
  let receiverIdType;
  let messageSenderType;
  let messageReceiverType;

  if (senderType === "company") {
    senderIdType = "company1_id";
    messageSenderType = "company_sender_id";
  } else {
    senderIdType = "user1_id";
    messageSenderType = "sender_id";
  }

  if (receiverType === "company") {
    receiverIdType = "company2_id";
    messageReceiverType = "company_receiver_id";
  } else {
    receiverIdType = "user2_id";
    messageReceiverType = "receiver_id";
  }

  // Crear el mensaje
  const message = await Message.create({
    chat_id: chatId,
    [messageSenderType]: userId,
    [messageReceiverType]: receiver_id,
    content,
  });

  chat.updated_at = new Date();
  await chat.save();

  return messageFormatter(message)[0];
};

const { Op } = require("sequelize");
const { Chat, Message } = require("../../db");
const CryptoJS = require("crypto-js");
const { CRYPTO_KEY } = require("../../../config");
const decryptMessage = require("../../helpers/decryptMessage");

module.exports = async (
  chatId,
  messageId,
  userId,
  userType,
  content,
  messageStatus
) => {
  const user = await Chat.findOne({
    where: {
      chat_id: chatId,
      [Op.or]: [{ user1_id: userId }, { user2_id: userId }],
    },
  });

  if (!user) {
    return { error: "Chat not found" };
  }

  const message = await Message.findOne({
    where: { message_id: messageId, chat_id: chatId },
  });

  if (!message) {
    return { error: "Message not found" };
  }

  if (
    message.sender_id === userId ||
    message.receiver_id === userId ||
    userType === "admin"
  ) {
    message.content = content;

    if (messageStatus && !["sent", "read", "deleted"].includes(messageStatus)) {
      return { error: "Invalid message status" };
    }

    if (messageStatus === "sent") {
      message.messageStatus = message.messageStatus;
    } else {
      message.messageStatus = messageStatus || message.messageStatus;
    }

    if (messageStatus === "deleted") {
      responseContent = "Este mensaje fue eliminado";
      content = CryptoJS.AES.encrypt(responseContent, CRYPTO_KEY).toString();
      message.content = content;
    }

    await message.save();

    message.content = decryptMessage(content);

    return message;
  }
  return {
    error: "Forbidden",
  };
};

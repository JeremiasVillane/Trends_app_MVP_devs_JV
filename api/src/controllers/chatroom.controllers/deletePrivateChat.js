const { Chat } = require("../../db");

module.exports = async (chatId, userId, userType) => {
  const chat = await Chat.findByPk(chatId);

  if (!chat) {
    return { error: "Chat not found " };
  }

  if (
    chat.user1_id === userId ||
    chat.user2_id === userId ||
    userType === "admin"
  ) {
    await chat.destroy();

    return { message: "Chat deleted successfully" };
  }
  return { error: "Not authorized" };
};

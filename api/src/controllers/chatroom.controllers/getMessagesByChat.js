const { Chat, Message, User } = require("../../db");
const chatFormatter = require("../../helpers/chatFormatter");

module.exports = async (chatId, userId, userType) => {
  const chat = await Chat.findByPk(chatId, {
    attributes: {
      exclude: ["chat_id", "user1_id", "user2_id", "created_at", "updated_at"],
    },
    include: [
      {
        model: User,
        as: "UserSent",
        attributes: ["username", "id", "profile_image"],
      },
      {
        model: User,
        as: "UserReceived",
        attributes: ["username", "id", "profile_image"],
      },
      {
        model: Message,
        include: [
          {
            model: User,
            attributes: ["username", "id", "profile_image"],
          },
        ],
      },
    ],
  });

  if (!chat) {
    return { error: "Chat not found" };
  }

  if (
    [chat.UserSent.id, chat.UserReceived.id].includes(userId) ||
    userType === "admin"
  ) {
    return chatFormatter(chat);
  }

  return { error: "Not authorized" };
};

const { Chat, Message, User, Company } = require("../../db");
const chatFormatter = require("../../helpers/chatFormatter");

module.exports = async (chatId, userId, userType) => {
  const chat = await Chat.findByPk(chatId, {
    attributes: {
      exclude: ["user1_id", "user2_id", "created_at", "updated_at"],
    },
    attributes: {
      exclude: [
        "user1_id",
        "user2_id",
        "company1_id",
        "company2_id",
        "created_at",
        "updated_at",
      ],
    },
    include: [
      {
        model: User,
        as: "UserSent",
        attributes: ["name", "username", "id", "profile_image"],
      },
      {
        model: Company,
        as: "CompanySent",
        attributes: ["name", "username", "id", "image"],
      },
      {
        model: User,
        as: "UserReceived",
        attributes: ["name", "username", "id", "profile_image"],
      },
      {
        model: Company,
        as: "CompanyReceived",
        attributes: ["name", "username", "id", "image"],
      },
      {
        model: Message,
        attributes: { exclude: ["chat_id"] },
        include: [
          {
            model: User,
            attributes: ["name", "username", "id", "profile_image"],
            as: "UserSender",
          },
          {
            model: User,
            attributes: ["name", "username", "id", "profile_image"],
            as: "UserReceiver",
          },
          {
            model: Company,
            attributes: ["name", "username", "id", "image"],
            as: "CompanySender",
          },
          {
            model: Company,
            attributes: ["name", "username", "id", "image"],
            as: "CompanyReceiver",
          },
        ],
      },
    ],
  });

  if (!chat) {
    return { error: "Chat not found" };
  }

  if (
    [
      chat.UserSent?.id,
      chat.UserReceived?.id,
      chat.CompanySent?.id,
      chat.CompanyReceived?.id,
    ].includes(userId)
  ) {
    return chatFormatter(chat)[0];
  } else {
    if (userType === "admin") {
      return chat;
    }
  }

  return { error: "Not authorized" };
};

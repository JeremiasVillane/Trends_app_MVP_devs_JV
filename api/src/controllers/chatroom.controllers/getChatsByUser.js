const { Chat, Message, User, Company } = require("../../db");
const { Op } = require("sequelize");
const chatFormatter = require("../../helpers/chatFormatter");

module.exports = async (id, userId, userType) => {
  let chats;

  // Solo el propio usuario puede acceder a sus chats
  // o usuarios de tipo admin
  if (
    (id === userId &&
      ["student", "professional", "company"].includes(userType)) ||
    userType === "admin"
  ) {
    chats = await Chat.findAll({
      where: {
        [Op.or]: [
          { user1_id: id },
          { user2_id: id },
          { company1_id: id },
          { company2_id: id },
        ],
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
          attributes: ["name", "username", "id", "profile_image", "status"],
        },
        {
          model: Company,
          as: "CompanySent",
          attributes: ["name", "username", "id", "image"],
        },
        {
          model: User,
          as: "UserReceived",
          attributes: ["name", "username", "id", "profile_image", "status"],
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
              attributes: ["name", "username", "id", "profile_image", "status"],
              as: "UserSender",
            },
            {
              model: User,
              attributes: ["name", "username", "id", "profile_image", "status"],
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
  } else {
    return { error: "Invalid credentials or user type" };
  }

  if (!chats || !chats.length) {
    return { error: "No chats found" };
  }

  return userType === "admin" ? chats : chatFormatter(chats);
};

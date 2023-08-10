const { Chat, Message, User } = require("../../db");
const { Op } = require("sequelize");

module.exports = async (id, userId, userType) => {
  // Solo el propio usuario puede acceder a sus chats
  // o usuarios de tipo admin
  if (id === userId || userType === "admin") {
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ user1_id: id }, { user2_id: id }],
      },
      attributes: {
        exclude: ["user1_id", "user2_id", "created_at", "updated_at"],
      },
      include: [
        {
          model: User,
          as: "UserSent",
          attributes: ["name", "username", "id", "profile_image"],
        },
        {
          model: User,
          as: "UserReceived",
          attributes: ["name", "username", "id", "profile_image"],
        },
        {
          model: Message,
          attributes: { exclude: ["chat_id"] },
          include: [
            {
              model: User,
              attributes: ["username", "id", "profile_image"],
            },
          ],
        },
      ],
    });

    if (!chats || !chats.length) {
      return { error: "No chats found" };
    }

    return chats;
  }
  // Si los chats no pertenecen al usuario logueado
  // y tampoco es admin, no está autorizado
  return { error: "Not authorized" };
};

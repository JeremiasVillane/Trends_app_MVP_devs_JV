const { User, UserChatGroup, MessageChatGroup } = require("../../db");
const messageFormatter = require("../../helpers/messageFormatter");

module.exports = async (groupId, userId, userType) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (userGroup || userType === "admin") {
    const messages = await MessageChatGroup.findAll({
      where: { chatGroupId: groupId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "type", "profile_image"],
        },
      ],
      attributes: { exclude: ["userId"] },
    });

    if (!messages || !messages.length) {
      return { error: "No messages found" };
    }

    return userType === "admin" ? messages : messageFormatter(messages);
  }
  return {
    error: "You don't have authorization to see messages from this group",
  };
};

const { User, UserChatGroup, MessageChatGroup } = require("../../db");
const decryptMessage = require("../../helpers/decryptMessage");
const messageFormatter = require("../../helpers/messageFormatter");

module.exports = async (groupId, content, userId, userType) => {
  const userGroup = await UserChatGroup.findOne({
    where: { chatGroupId: groupId, userId: userId },
  });

  if (userGroup || userType === "admin") {
    const message = await MessageChatGroup.create({ content });
    await message.setUser(userId);
    await message.setChatGroup(groupId);

    message.content = decryptMessage(content);

    const outputMessage = await MessageChatGroup.findOne({
      where: { id: message.id },
      include: [
        {
          model: User,
          attributes: ["name", "username", "id", "profile_image"],
        },
      ],
    });

    return messageFormatter(outputMessage)[0];
  }

  return {
    error: "You don't have authorization to send messages to this group",
  };
};

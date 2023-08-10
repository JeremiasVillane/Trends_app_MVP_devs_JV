const { ChatGroup, User, MessageChatGroup } = require("../../db");

module.exports = async (userId, userType) => {
  const groups = await ChatGroup.findAll({
    include: [
      {
        model: User,
        through: {
          attributes: {
            exclude: ["chatGroupId", "userId", "createdAt", "updatedAt"],
          },
        },
        attributes: ["id", "username", "type", "profile_image"],
      },
      {
        model: MessageChatGroup,
        attributes: { exclude: ["chatGroupId"] },
      },
    ],
  });

  if (!groups || !groups.length) {
    return { error: "No groups found" };
  }

  let outputGroups = [];

  for (const group of groups) {
    const outputGroup = {
      id: group.id,
      ownerId: group.ownerId,
      name: group.name,
      image: group.image,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
      users: group.users,
      messages: group.messageChatGroups,
    };
    outputGroups.push(outputGroup);
  }

  if (userType === "admin") {
    return outputGroups;
  }

  const filteredGroups = outputGroups.filter((group) => {
    return group.users.some((user) => user.id === userId);
  });

  return filteredGroups;
};

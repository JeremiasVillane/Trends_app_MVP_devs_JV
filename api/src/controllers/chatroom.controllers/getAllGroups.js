const { ChatGroup, User, MessageChatGroup } = require("../../db");
const messageFormatter = require("../../helpers/messageFormatter");

module.exports = async (userId, userType, list) => {
  const groups = await ChatGroup.findAll({
    include: [
      {
        model: User,
        through: {
          attributes: {
            exclude: ["chatGroupId", "userId", "createdAt", "updatedAt"],
          },
        },
        attributes: ["id", "name", "username", "type", "profile_image", "status"],
      },
      {
        model: MessageChatGroup,
        attributes: { exclude: ["chatGroupId"] },
        include: [
          {
            model: User,
            attributes: ["name", "username", "id", "profile_image", "status"],
          },
        ]
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
      messages:
        userType === "admin"
          ? group.messageChatGroups
          : messageFormatter(group.messageChatGroups),
    };
    outputGroups.push(outputGroup);
  }

  if (userType === "admin") {
    return outputGroups;
  }

  const filteredGroups = outputGroups.filter((group) => {
    return group.users.some((user) => user.id === userId);
  });

  if (list) {
    let groupsList = [];

    filteredGroups.forEach((group) => {
      const groupToAdd = {
        groupId: group.id,
        groupName: group.name,
        groupImage: group.image,
        participants: group.users,
      };

      const userIsOwner = group.ownerId === userId;
      const userIsModerator = group.users.some(
        (user) => user.id === userId && user.userChatGroup.role === "Moderador"
      );

      if (userIsOwner || userIsModerator) {
        if (
          !groupsList.some(
            (listedGroup) => listedGroup.groupId === groupToAdd.groupId
          )
        ) {
          groupsList.push(groupToAdd);
        }
      }
    });

    return groupsList;
  }

  return filteredGroups;
};

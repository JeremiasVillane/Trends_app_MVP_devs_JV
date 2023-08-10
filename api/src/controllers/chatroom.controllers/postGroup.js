const { ChatGroup } = require("../../db");
const postUserInGroup = require("./postUserInGroup");

module.exports = async (name, image, userId, userType) => {
  const group = await ChatGroup.create({ ownerId: userId, name, image });

  if (userType !== "admin") {
    try {
      await postUserInGroup(group, userId, "moderator");
    } catch (error) {
      return { error: "Error including user in new group" };
    }
  }

  return group;
};

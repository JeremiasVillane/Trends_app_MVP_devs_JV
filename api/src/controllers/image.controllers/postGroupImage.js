const { Image, Admin, ChatGroup } = require("../../db");
const { putGroup } = require("../chatroom.controllers");
const { getUserById } = require("../search.controllers");

module.exports = async (userId, userType, group, filename, path) => {
  let typeOfId;

  if (["student", "professional"].includes(userType)) {
    typeOfId = "userId";
  } else if (userType === "company") {
    typeOfId = "companyId";
  } else typeOfId = "adminId";

  const savedImage = await Image.create({
    [typeOfId]: userId,
    filename,
    filepath: path,
  });

  if (!savedImage) {
    return { error: "Failed to upload image" };
  }

  try {
    await putGroup(group, null, path)
    
  } catch (error) {
    return { error: error.message };
  }

  return { imageId: savedImage.id, groupId: group.id, imagePath: path };
};

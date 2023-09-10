const { Image } = require("../../db");
const { putGroup } = require("../chatroom.controllers");

module.exports = async (userId, userType, group, filename, path) => {
  let typeOfId;

  if (["student", "professional"].includes(userType)) {
    typeOfId = "userId";
  } else if (userType === "company") {
    typeOfId = "companyId";
  } else typeOfId = "adminId";

  const imageUrl = `/api/v1/images/files/${filename}`;

  const savedImage = await Image.create({
    [typeOfId]: userId,
    filename,
    filepath: path,
    imageUrl,
  });

  if (!savedImage) {
    return { error: "Failed to upload image" };
  }

  try {
    await putGroup(group, null, imageUrl)
    
  } catch (error) {
    return { error: error.message };
  }

  return { imageId: savedImage.id, groupId: group.id, imageUrl };
};

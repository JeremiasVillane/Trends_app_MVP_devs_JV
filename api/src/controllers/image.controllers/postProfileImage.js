const { Image, Admin } = require("../../db");
const { getUserById } = require("../search.controllers");
const { putUserProfile } = require("../user.controllers");

module.exports = async (userId, userType, filename, path) => {
  let typeOfId;

  if (["student", "professional"].includes(userType)) {
    typeOfId = "userId";
  } else if (userType === "company") {
    typeOfId = "companyId";
  } else typeOfId = "adminId";

  const imageUrl = `/images/files/${filename}`;

  const savedImage = await Image.create({
    [typeOfId]: userId,
    filename,
    filepath: path,
    imageUrl,
    isProfileImage: true,
  });

  if (!savedImage) {
    return { error: "Failed to upload image" };
  }

  let currentProfile;

  try {
    currentProfile = await getUserById(userId);

    if (!currentProfile) {
      currentProfile = await Admin.findOne({
        where: { id: userId },
      });
    }

    if (!currentProfile) {
      return { error: "User not found" };
    }

    let imageProp;

    if (["company", "admin"].includes(currentProfile.type)) {
      imageProp = "image";
    } else imageProp = "profile_image";

    await putUserProfile(currentProfile, { [imageProp]: path });
  } catch (error) {
    return { error: error.message };
  }

  return { imageId: savedImage.id, profileId: userId, imageUrl };
};

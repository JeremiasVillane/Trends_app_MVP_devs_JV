const { Image, Admin, conn } = require("../../db");
const { getUserById } = require("../search.controllers");
const { putUserProfile } = require("../user.controllers");
const path = require("path");
const fs = require("fs");

module.exports = async (userId, userType, filename, filepath) => {
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
    filepath,
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

    // const imageToReplace = await Image.findOne({
    //   where: {
    //     userId: userId,
    //     isProfileImage: true,
    //   },
    // });

    // if (imageToReplace) {
    //   const imagePath = path.resolve(imageToReplace.filepath);
    //   await fs.promises.access(imagePath);
    //   await fs.promises.unlink(imagePath);

    //   await Image.destroy({
    //     where: {
    //       id: imageToReplace.id,
    //     },
    //   });
    // }

    let imageProp;

    if (["company", "admin"].includes(currentProfile.type)) {
      imageProp = "image";
    } else imageProp = "profile_image";

    await putUserProfile(currentProfile, { [imageProp]: imageUrl });
  } catch (error) {
    return { error: error.message };
  }

  return { imageId: savedImage.id, profileId: userId, imageUrl };
};

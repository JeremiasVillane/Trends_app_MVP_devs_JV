const { Image } = require("../../db");

module.exports = async (id, type, filename, path) => {
  let typeOfId;

  if (["student", "professional"].includes(type)) {
    typeOfId = "userId";
  } else if (type === "company") {
    typeOfId = "companyId";
  } else typeOfId = "adminId";

  const imageUrl = `/api/v1/images/files/${filename}`;

  const savedImage = await Image.create({
    [typeOfId]: id,
    filename,
    filepath: path,
    imageUrl,
  });

  if (!savedImage) {
    return { error: "Failed to upload image" };
  }

  return { imageId: savedImage.id, imageUrl };
};

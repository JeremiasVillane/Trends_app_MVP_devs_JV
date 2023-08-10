const { Image } = require("../../db");

module.exports = async (id, type, filename, path) => {
  let typeOfId;

  if (["student", "professional"].includes(type)) {
    typeOfId = "userId";
  } else if (type === "company") {
    typeOfId = "companyId";
  } else typeOfId = "adminId";

  const savedImage = await Image.create({
    [typeOfId]: id,
    filename,
    filepath: path,
  });

  if (!savedImage) {
    return { error: "Failed to upload image" };
  }

  return { imageId: savedImage.id, imagePath: path };
};

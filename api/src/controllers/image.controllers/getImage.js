const { Image } = require("../../db");

module.exports = async (imageId) => {
  const dbImage = await Image.findOne({
    where: { id: imageId },
  });

  if (!dbImage || !dbImage.length) {
    return { error: "No images found" };
  }

  return dbImage;
};

const { Image } = require("../../db");
const path = require("path");
const fs = require("fs");

module.exports = async (imageUrl, currentUserId, currentUserType) => {
  const foundImage = await Image.findOne({
    where: {
      imageUrl,
    },
  });

  if (!foundImage) {
    return { error: "Image not found" };
  }

  const { userId, companyId, adminId } = foundImage;

  if (
    [userId, companyId, adminId].includes(currentUserId) ||
    currentUserType === "admin"
  ) {
    const imagePath = path.resolve(foundImage.filepath);

    try {
      await fs.promises.access(imagePath);

      await fs.promises.unlink(imagePath);

      await Image.destroy({
        where: {
          imageUrl,
        },
      });

      return { message: "Image and reference deleted successfully" };
    } catch (err) {
      return { error: "Error deleting image or reference" };
    }
  }

  return { error: "Forbidden" };
};

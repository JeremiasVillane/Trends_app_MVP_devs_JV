const { Op } = require("sequelize");
const { Image } = require("../../db");

module.exports = async (id, UserId, UserType) => {
  if (UserId === id || UserType === "admin") {
    const dbImages = await Image.findAll({
      where: {
        [Op.or]: [{ userId: id }, { companyId: id }, { adminId: id }],
      },
    });

    if (!dbImages || !dbImages.length) {
      return { error: "No images found" };
    }

    return dbImages;
  }
  return { error: "Not authorized" };
};

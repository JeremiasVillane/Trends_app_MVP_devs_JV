const { DataTypes } = require("sequelize");
const { DEFAULT_IMG_GROUP } = require("../../config");
const isImageUrlOrLocalPath = require("../helpers/isImageUrlOrLocalPath");

module.exports = (sequelize) => {
  const ChatGroup = sequelize.define("chatGroup", {
    ownerId: {
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DEFAULT_IMG_GROUP,
      validate: {
        isImageUrlOrLocalPath: (value) => {
          if (!isImageUrlOrLocalPath(value)) {
            throw new Error("Invalid image URL or local path format.");
          }
        },
      },
      set(value) {
        this.setDataValue("image", value || DEFAULT_IMG_GROUP);
      },
    },
  });
  return ChatGroup;
};

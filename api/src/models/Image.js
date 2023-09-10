const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Image = sequelize.define("image", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isProfileImage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Image;
};

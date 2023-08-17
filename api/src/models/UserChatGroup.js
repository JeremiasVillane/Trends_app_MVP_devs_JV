const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserChatGroup = sequelize.define(
    "userChatGroup", {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chatGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return UserChatGroup;
};

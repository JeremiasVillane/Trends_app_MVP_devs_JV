const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const MessageChatGroup = sequelize.define(
    "messageChatGroup", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    messageStatus: {
      type: DataTypes.STRING,
      defaultValue: "sent",
    },
  });
  
  return MessageChatGroup;
};

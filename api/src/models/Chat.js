const { DataTypes } = require("sequelize");
const User = require("./User");

module.exports = (sequelize) => {
  const Chat = sequelize.define(
    "chat",
    {
      chat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    { timestamps: false }
  );

  return Chat;
};

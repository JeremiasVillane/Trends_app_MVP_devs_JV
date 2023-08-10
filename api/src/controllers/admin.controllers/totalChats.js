const { User, Chat, conn } = require("../../db");

module.exports = async (userType) => {
  return await Chat.findAll({
    attributes: [
      [conn.fn("COUNT", conn.col("chat_id")), "total_chats"],
      [conn.fn("DATE_TRUNC", "hour", conn.col("created_at")), "creation_date"],
    ],
    include: [
      {
        model: User,
        as: "UserSent",
        where: { type: userType },
        attributes: [],
      },
      {
        model: User,
        as: "UserReceived",
        where: { type: "professional" },
        attributes: [],
      },
    ],
    group: [conn.fn("DATE_TRUNC", "hour", conn.col("created_at"))],
    // group: [conn.fn("TO_CHAR", conn.col("created_at"), "YYYY-MM-DD HH24:MI")],
  });
};

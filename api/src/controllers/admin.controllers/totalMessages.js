const { User, Message, conn } = require("../../db");

module.exports = async (userType) => {
  return await Message.findAll({
    attributes: [
      [conn.fn("COUNT", conn.col("message_id")), "total_messages"],
      [
        conn.fn("DATE_TRUNC", "hour", conn.col("message.createdAt")),
        "creation_date",
      ],
    ],
    include: [
      {
        model: User,
        as: "UserSender",
        where: { type: userType },
        attributes: [],
      },
      {
        model: User,
        as: "UserReceiver",
        where: { type: "professional" },
        attributes: [],
      },
    ],
    group: [conn.fn("DATE_TRUNC", "hour", conn.col("message.createdAt"))],
  });
};

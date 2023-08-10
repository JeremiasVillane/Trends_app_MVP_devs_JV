const { User, ChatGroup, conn } = require("../../db");

module.exports = async (userType) => {
  return await ChatGroup.findAll({
    attributes: [
      [conn.fn("COUNT", conn.col("chatGroup.id")), "total_groups"],
      [conn.fn("DATE_TRUNC", "hour", conn.col("chatGroup.createdAt")), "creation_date"],
    ],
    include: [
      {
        model: User,
        as: "UserOwner",
        where: { type: userType },
        attributes: [],
      }
    ],
    group: [conn.fn("DATE_TRUNC", "hour", conn.col("chatGroup.createdAt"))],
    // group: [conn.fn("TO_CHAR", conn.col("created_at"), "YYYY-MM-DD HH24:MI")],
  });
};
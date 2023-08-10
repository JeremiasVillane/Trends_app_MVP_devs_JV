const { Company, User, conn } = require("../../db");
const DATE_BY_MIN = "YYYY-MM-DD HH24:MI TZ";

// const findAllUsers = async () => {
//   const users = await User.scope("withoutPassword").findAll();
//   const companies = await Company.scope("withoutPassword").findAll();
//   return [...users, ...companies];
// };

module.exports = async () => {
  const studentsData = await User.findAll({
    attributes: [
      [conn.fn("COUNT", conn.col("id")), "total"],
      [
        conn.fn("TO_CHAR", conn.col("createdAt"), DATE_BY_MIN),
        "creation_date_utc",
      ],
    ],
    where: { type: "student" },
    group: [conn.fn("TO_CHAR", conn.col("createdAt"), DATE_BY_MIN)],
    order: [[conn.fn("TO_CHAR", conn.col("createdAt"), DATE_BY_MIN), "ASC"]],
  });
  const professionalsData = await User.findAll({
    attributes: [
      [conn.fn("COUNT", conn.col("id")), "total"],
      [
        conn.fn("TO_CHAR", conn.col("createdAt"), DATE_BY_MIN),
        "creation_date_utc",
      ],
    ],
    where: { type: "professional" },
    group: [conn.fn("TO_CHAR", conn.col("createdAt"), DATE_BY_MIN)],
    order: [[conn.fn("TO_CHAR", conn.col("createdAt"), DATE_BY_MIN), "ASC"]],
  });

  const companiesData = await Company.findAll({
    attributes: [
      [conn.fn("COUNT", conn.col("id")), "total"],
      [
        conn.fn("TO_CHAR", conn.col("createdAt"), DATE_BY_MIN),
        "creation_date_utc",
      ],
    ],
    group: [conn.fn("TO_CHAR", conn.col("createdAt"), DATE_BY_MIN)],
    order: [[conn.fn("TO_CHAR", conn.col("createdAt"), DATE_BY_MIN), "ASC"]],
  });
  return {
    students: studentsData,
    professionals: professionalsData,
    companies: companiesData,
  };
};

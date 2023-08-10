const { User, Company, Job, Admin } = require("../../db");

module.exports = async (user) => {
  let foundedUser = null;
  try {
    if (user.type.toLowerCase() === "company")
      foundedUser = await Company.scope("withoutPassword").findByPk(user.id, {
        include: {
          model: Job,
          attributes: {
            exclude: ["companyId"],
          },
        },
      });
    if (user.type.toLowerCase() === "professional")
      foundedUser = await User.scope("withoutPassword").findByPk(user.id);
    if (user.type.toLowerCase() === "student")
      foundedUser = await User.scope("withoutPassword", "student").findByPk(
        user.id
      );
    if (user.type.toLowerCase() === "admin")
      foundedUser = await Admin.scope("withoutPassword").findByPk(user.id);
    return foundedUser;
  } catch (error) {
    throw new Error("Could not find user in db.");
  }
};

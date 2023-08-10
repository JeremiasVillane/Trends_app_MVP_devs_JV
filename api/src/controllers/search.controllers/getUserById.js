const { User, Company, Job } = require("../../db");

module.exports = async (id) => {
  let foundUser;

  foundUser = await User.findOne({
    where: { id },
    attributes: {
      exclude: ["password"],
    },
  });

  if (!foundUser) {
    foundUser = await Company.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Job,
        attributes: {
          exclude: ["companyId"],
        },
      },
    });
  }

  if (!foundUser) return null;

  // const plainUser = foundUser.toJSON();

  // const { type } = plainUser;

  // if (type === "student") {
  //   delete plainUser.info_company_name;
  //   delete plainUser.info_position;
  // } else if (type === "professional") {
  //   delete plainUser.academic_level;
  // }

  // return plainUser;
  return foundUser;
};

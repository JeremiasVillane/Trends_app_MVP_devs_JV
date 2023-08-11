const { User, Company, Job } = require("../db");

const postUserTest = async (data) => {
  try {
    if (["student", "professional"].includes(data.type)) {
      const newUser = await User.create(data);

      const user = await User.findOne({
        where: { id: newUser.id },
      });

      return user;
    }

    if (data.type === "company") {
      const newCompany = await Company.create(data);

      return newCompany;
    }

    const newJob = await Job.create(data);

    return newJob;
  } catch (error) {
    console.log(error);
  }
};

module.exports = postUserTest;

const { ADMIN_USERNAME, ADMIN_PASSWORD } = require("../../config");
const { User, Company, Admin } = require("../db");

const createNewUser = async (userData) => {
  try {
    // console.log(userData);
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error(`User could not be created. ${error}`);
  }
};

const createNewCompany = async (companyData) => {
  try {
    const newCompany = await Company.create(companyData);

    // const { data } = companyData;
    //  try {
    // console.log(data);
    //   const newCompany = await Company.create(companyData);
    //  console.log(newCompany);

    return newCompany;
  } catch (error) {
    throw new Error(`Company could not be created. ${error}`);
  }
};

const addAdmin = async () => {
  const admins = await Admin.findAll();
  if (admins.length === 0)
    await Admin.create({
      type: "admin",
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
};

module.exports = {
  createNewCompany,
  createNewUser,
  addAdmin,
};

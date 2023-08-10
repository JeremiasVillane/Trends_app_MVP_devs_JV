const { createNewCompany, createNewUser } = require("../../helpers/createUser");
const { createToken } = require("../../helpers/jwt");

const userType = (type) => {
  if (type.toLowerCase() === "company") return createNewCompany;
  return createNewUser;
};

module.exports = async (userData) => {
  const { type } = userData;
  const createNewAccount = userType(type);
  const createdAccount = await createNewAccount(userData);
  if (!createdAccount.id || !createdAccount)
    throw new Error(`Error creating a new user. ${error}`);
  // console.log(createdAccount.id);
  const token = await createToken({ id: createdAccount.id });
  return token;
};

//{ body : {profile: createdUser.profile, academic: createdUser.academic, info: createdUser.info}

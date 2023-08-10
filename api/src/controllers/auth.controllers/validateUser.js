const { findAccount } = require("../../helpers/findAccount");
const { createToken } = require("../../helpers/jwt");

module.exports = async (userData) => {
  const { user, password } = userData;
  const foundedAccount = await findAccount(user);
  // console.log(foundedAccount);
  if (!foundedAccount) return;
  const isCorrectPassword = await foundedAccount.comparePassword(password);
  if (!isCorrectPassword) return;
  const token = await createToken({ id: foundedAccount.id });
  return token;
};

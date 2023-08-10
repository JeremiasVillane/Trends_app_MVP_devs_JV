const { findAccount } = require("../../helpers/findAccount");

module.exports = async (userId, newPassword, currentPassword) => {
  const foundedUser = await findAccount({ id: userId });
  if (!foundedUser) throw new Error("No valid user found to change password.");
  if (!(await foundedUser.comparePassword(currentPassword)))
    throw new Error("The entered password does not match the saved password.");
  if (currentPassword === newPassword)
    throw new Error(
      "The current password has to be different from the previous one."
    );
  return await foundedUser.update({ password: newPassword });
};

const { changeUserPassword } = require("../../controllers/user.controllers");

module.exports = async (req, res) => {
  const { id } = req.user;
  const { newPassword, currentPassword } = req.body;
  try {
    const result = await changeUserPassword(id, newPassword, currentPassword);
    if (!result) throw new Error("Could not update password.");
    res.status(200).json("Password updated successfully.");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

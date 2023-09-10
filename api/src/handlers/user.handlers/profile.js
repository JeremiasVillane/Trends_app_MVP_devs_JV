const { getUserProfile } = require("../../controllers/user.controllers");

module.exports = async (req, res) => {
  const { user } = req;
  try {
    // console.log("user profile, route protected.");
    const foundedUser = await getUserProfile(user);
    if (!foundedUser) throw new Error("User not found.");
    res.status(200).json(foundedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

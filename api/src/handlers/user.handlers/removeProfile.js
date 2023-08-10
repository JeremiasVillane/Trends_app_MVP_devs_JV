const { deleteUserProfile } = require("../../controllers/user.controllers");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const removedProfile = await deleteUserProfile(id);

    if (!removedProfile) {
      return res.status(400).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Profile successfully removed" });
  } catch (error) {
    res.status(500).json({ error: "The profile couldn't be deleted" });
  }
};

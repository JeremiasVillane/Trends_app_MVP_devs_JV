const { putUserProfile } = require("../../controllers/user.controllers");

module.exports = async (req, res) => {
  const profileData = req.body;
  const { profile } = req;

  try {
    const editedProfile = await putUserProfile(profile, profileData);

    if (!editedProfile) {
      return res.status(500).json({ error: "The profile couldn't be updated" });
    }

    return res.status(201).json(editedProfile);
  } catch (error) {
    return res.status(500).json({ error: "Error updating the database" });
  }
};

const { deleteGroup } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const group = req.group;
    const { id: userId, type: userType } = req.user;

    const removedGroup = await deleteGroup(group, userId, userType);

    if (removedGroup?.error) {
      return res.status(400).json({ error: removedGroup.error });
    }

    res.status(200).json(removedGroup);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error deleting group" });
  }
};

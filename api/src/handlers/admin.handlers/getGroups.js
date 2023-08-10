const { getAllGroups } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const allGroups = await getAllGroups(null, "admin");

    res.status(200).json(allGroups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

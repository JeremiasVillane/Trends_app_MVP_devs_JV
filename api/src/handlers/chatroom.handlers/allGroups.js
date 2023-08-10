const { getAllGroups } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { id: userId, type: userType } = req.user;
    const list = req.query.list === "true" ? true : false;
    const foundGroups = await getAllGroups(userId, userType, list);

    if (foundGroups?.error) {
      return res.status(400).json({ error: foundGroups.error });
    }

    res.status(200).json(foundGroups);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error retrieving data from database" });
  }
};

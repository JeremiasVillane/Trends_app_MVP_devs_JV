const { postUserInGroup } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const group = req.group;

    const addedUser = await postUserInGroup(group, userId, role);

    if (addedUser?.error) {
      return res.status(400).json({ error: addedUser.error });
    }

    res.status(200).json(addedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error adding user to chat group" });
  }
};

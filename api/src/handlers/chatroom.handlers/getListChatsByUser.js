const { getChatsByUser } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, type: userType } = req.user;

    const listChats = await getChatsByUser(id, userId, userType);

    if (listChats?.error) {
      return res.status(400).json({ error: listChats.error });
    }

    return res.status(200).json(listChats);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error retrieving data from database" });
  }
};

const { deletePrivateChat } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { id: userId, type: userType } = req.user;
    const { chatId } = req.params;

    const removedChat = await deletePrivateChat(chatId, userId, userType);

    if (removedChat?.error) {
      return res.status(400).json({ error: removedChat.error });
    }

    res.status(200).json(removedChat);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error deleting group" });
  }
};

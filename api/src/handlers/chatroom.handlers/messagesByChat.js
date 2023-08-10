const { getMessagesByChat } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { id: userId, type: userType } = req.user;

    const foundMessages = await getMessagesByChat(chatId, userId, userType);

    if (foundMessages?.error) {
      return res.status(500).json({ error: foundMessages.error });
    }

    return res.status(200).json(foundMessages);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

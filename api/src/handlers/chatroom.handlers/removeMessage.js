const {
  deleteMessage,
} = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;
    const { id: userId, type: userType } = req.user;

    const removedMessage = await deleteMessage(
      chatId,
      messageId,
      userId,
      userType
    );

    if (removedMessage?.error) {
      return res.status(400).json({ error: removedMessage.error });
    }

    return res.status(200).json(removedMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error deleting message" });
  }
};

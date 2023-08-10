const { putMessage } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { chatId, messageId } = req.params;
    const { content, messageStatus } = req.body;
    const { id: userId, type: userType } = req.user;

    const updatedMessage = await putMessage(
      chatId,
      messageId,
      userId,
      userType,
      content,
      messageStatus
    );

    if (updatedMessage?.error) {
      return res.status(400).json({ error: updatedMessage.error });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error updating message" });
  }
};

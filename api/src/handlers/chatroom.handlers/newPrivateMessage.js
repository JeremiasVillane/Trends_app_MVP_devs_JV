const { postPrivateMessage } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;
    const { id: userId, type: userType } = req.user;

    const createdPrivateMessage = await postPrivateMessage(
      chatId,
      content,
      userId,
      userType
    );

    if (createdPrivateMessage?.error) {
      return res.status(403).json({ error: createdPrivateMessage.error });
    }

    res.status(201).json(createdPrivateMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error creating message" });
  }
};

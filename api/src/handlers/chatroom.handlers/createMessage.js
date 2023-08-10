const { postMessage } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { sender_id, receiver_id, content } = req.body;
    const { id: userId, type: userType } = req.user;

    if (!sender_id || !receiver_id || !content) {
      return res.status(400).json({ error: "Missing data" });
    }

    const newMessage = await postMessage(
      sender_id,
      receiver_id,
      content,
      userId,
      userType
    );

    if (newMessage?.error) {
      return res.status(400).json({ error: newMessage.error });
    }
    return res.status(200).json(newMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating new message" });
  }
};

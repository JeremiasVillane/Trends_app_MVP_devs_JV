const { postPrivateChat } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { contactId } = req.body;
    const { id: userId, type: userType } = req.user;

    if (!contactId) {
      return res.status(400).json({ error: "Missing data: contact id" });
    }

    const newPrivateChat = await postPrivateChat(contactId, userId, userType);

    if (newPrivateChat?.error) {
      return res.status(400).json({ error: newPrivateChat.error });
    }
    return res.status(201).json(newPrivateChat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating new private chat" });
  }
};

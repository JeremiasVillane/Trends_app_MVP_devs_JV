const {
  getAllGroupMessages,
} = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { id: userId, type: userType } = req.user;

    const foundGroupMessages = await getAllGroupMessages(
      groupId,
      userId,
      userType
    );

    if (foundGroupMessages?.error) {
      return res.status(403).json({ error: foundGroupMessages.error });
    }

    res.status(200).json(foundGroupMessages);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Error obtaining messages from the chat group" });
  }
};

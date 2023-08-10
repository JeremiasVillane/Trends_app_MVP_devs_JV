const {
  deleteGroupMessage,
} = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { groupId, messageId } = req.params;
    const { id: userId, type: userType } = req.user;

    const removedGroupMessage = await deleteGroupMessage(
      groupId,
      messageId,
      userId,
      userType
    );

    if (removedGroupMessage?.error) {
      return res.status(400).json({ error: removedGroupMessage.error });
    }

    return res.status(200).json(removedGroupMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error deleting message" });
  }
};

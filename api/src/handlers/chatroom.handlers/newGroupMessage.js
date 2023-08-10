const { postGroupMessage } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { content } = req.body;
    const { id: userId, type: userType } = req.user;

    const createdGroupMessage = await postGroupMessage(
      groupId,
      content,
      userId,
      userType
    );

    if (createdGroupMessage?.error) {
      return res.status(403).json({ error: createdGroupMessage.error });
    }

    res.status(201).json(createdGroupMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error creating message" });
  }
};

const {
  deleteUserFromGroup,
} = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const group = req.group;
    const { groupId, userId } = req.params;
    const ownerId = req.group.ownerId;
    const { type: currentUserType } = req.user;

    const removedUserFromGroup = await deleteUserFromGroup(
      group,
      groupId,
      userId,
      ownerId,
      currentUserType
    );

    if (removedUserFromGroup?.error) {
      return res.status(404).json({ error: removedUserFromGroup.error });
    }

    res.status(200).json(removedUserFromGroup);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error removing user from group" });
  }
};

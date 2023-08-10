const { patchUserRole } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const group = req.group;
    const { groupId, userId } = req.params;
    const ownerId = req.group.ownerId;
    const { role } = req.body;
    const { id: currentUserId, type: currentUserType } = req.user;

    const editedUserRole = await patchUserRole(
      group,
      groupId,
      userId,
      ownerId,
      role,
      currentUserId,
      currentUserType
    );

    if (editedUserRole?.error) {
      return res.status(400).json({ error: editedUserRole.error });
    }

    res.status(200).json(editedUserRole);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Error updating user role",
    });
  }
};

module.exports = async (group, userId, userType) => {
  const plainGroup = group.toJSON();
  const currentUserRole = plainGroup.users.filter(
    (user) => user.id === userId
  )[0].userChatGroup.role;

  if (
    group.ownerId === userId ||
    // currentUserRole === "Moderador" ||
    userType === "admin"
  ) {
    await group.destroy();

    return { message: "Group deleted successfully" };
  }
  return { error: "Not authorized" };
};

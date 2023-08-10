module.exports = async (group, userId, userType) => {
  if (group.ownerId === userId || userType === "admin") {
    await group.destroy();

    return { message: "Group deleted successfully" };
  }
  return { error: "Not authorized" };
};

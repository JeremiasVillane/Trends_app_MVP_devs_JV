const {
  getUserConversations,
} = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { query_name } = req.query;
    const {
      id: userId,
      type: userType,
      username,
      name,
      profile_image,
    } = req.user;

    const allConversations = await getUserConversations(
      id,
      userId,
      userType,
      username,
      name,
      profile_image,
      query_name
    );

    if (allConversations?.error) {
      return res.status(400).json({ error: allConversations.error });
    }

    return res.status(200).json(allConversations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

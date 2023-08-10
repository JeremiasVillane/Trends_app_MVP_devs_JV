const { postGroup } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const { name, image } = req.body;
    const { id: userId, type: userType } = req.user;
    const createdGroup = await postGroup(name, image, userId, userType);

    if (createdGroup?.error) {
      return res.status(500).json({ error: createdGroup.error });
    }

    res.status(201).json(createdGroup);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error creating chat group" });
  }
};

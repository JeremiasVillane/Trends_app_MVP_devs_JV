const { putGroup } = require("../../controllers/chatroom.controllers");

module.exports = async (req, res) => {
  try {
    const group = req.group;
    const { name, image } = req.body;

    if (!name && !image) {
      return res.status(400).json({
        error: "Insufficient data: a name or an image must be provided",
      });
    }

    const updatedGroup = await putGroup(group, name, image);

    if (updatedGroup?.error) {
      return res.status(404).json({ error: updatedGroup.error });
    }

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error updating group" });
  }
};

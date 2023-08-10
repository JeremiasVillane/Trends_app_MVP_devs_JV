const { getUserById } = require("../../controllers/search.controllers");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await getUserById(id);

    if (!userById) {
      return res.status(400).json({
        error: "No user with that id found",
      });
    }

    res.status(200).json(userById);
  } catch (error) {
    return res.status(500).json({
      error: "Error searching user",
    });
  }
};

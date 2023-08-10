const { getUserFeed } = require("../../controllers/user.controllers");

module.exports = async (req, res) => {
  const { id, usersType } = req.params;
  const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
  const perPage = parseInt(req.query.perPage) || 10; // Cantidad por página, por defecto 10

  if (!["student", "professional", "company"].includes(usersType)) {
    return res.status(400).json({ error: "Invalid user type" });
  }

  try {
    const userFeed = await getUserFeed(id, usersType, page, perPage);

    if (!userFeed) {
      return res.status(500).json({
        error: "Error loading the feed",
      });
    }

    if (userFeed.error)
      return res.status(500).json({
        error: userFeed.error,
      });

    res.status(200).json(userFeed);
  } catch (error) {
    return res.status(500).json({
      error: "Error retrieving the feed data",
    });
  }
};

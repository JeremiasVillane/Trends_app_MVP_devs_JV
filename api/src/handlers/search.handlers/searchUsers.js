const { getUsers } = require("../../controllers/search.controllers");

module.exports = async (req, res) => {
  const queryParams = { ...req.query };
  const userType = queryParams?.type;
  const page = parseInt(queryParams.page) || 1; // Página actual, por defecto 1
  const perPage = parseInt(req.query.perPage) || 10; // Cantidad por página, por defecto 10
  delete queryParams.page;
  delete queryParams.perPage;

  if (!["student", "professional", "company"].includes(userType)) {
    return res.status(400).json({ error: "Invalid user type" });
  }

  try {
    const users = await getUsers(queryParams, userType, page, perPage);

    // if (!users) {
    //   return res.status(400).json({ error: "No users found" });
    // }
    if (users?.error)
      return res.status(500).json({
        error: users.error,
      });

    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

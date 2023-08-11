const totalGroups = require("../../controllers/admin.controllers/totalGroups");

module.exports = async (req, res) => {
  const { userType } = req.params;
  try {
    if (
      userType.toLowerCase() !== "student" &&
      userType.toLowerCase() !== "professional"
    )
      throw new Error("Invalid params.");
    const result = await totalGroups(userType);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

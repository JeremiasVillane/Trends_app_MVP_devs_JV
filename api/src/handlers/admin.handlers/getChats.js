const { totalChats } = require("../../controllers/admin.controllers");

module.exports = async (req, res) => {
  const { userType } = req.params;
  try {
    if (
      userType.toLowerCase() !== "student" &&
      userType.toLowerCase() !== "professional"
    )
      throw new Error("Invalid params.");
    const result = await totalChats(userType);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

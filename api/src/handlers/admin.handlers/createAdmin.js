const { createNewAdmin } = require("../../controllers/admin.controllers");

module.exports = async (req, res) => {
  const newAdmin = req.body;
  try {
    const result = await createNewAdmin(newAdmin);
    if (!result) throw new Error("Cannot create user.");
    res.status(200).json("User create successfully.");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

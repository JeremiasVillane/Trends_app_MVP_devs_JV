const { NODE_ENV } = require("../../../config");
const { validateUser } = require("../../controllers/auth.controllers");

module.exports = async (req, res) => {
  const userData = req.body;
  try {
    const token = await validateUser(userData);
    if (!token) {
      res.cookie("token", "", {
        expires: new Date(0),
      });
      throw new Error("Incorrect credentials.");
    }
    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json("Login successfully.");
    // res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

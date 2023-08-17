const { NODE_ENV } = require("../../../config");
const { findAccount } = require("../../helpers/findAccount");
const { registerUser } = require("../../controllers/auth.controllers");

module.exports = async (req, res) => {
  const newUser = req.body;
  // console.log(newUser);
  try {
    const foundedEmail = await findAccount(newUser.email);
    const foundedUsername = await findAccount(newUser.username);
    if (foundedEmail) throw new Error("this email is already used.");
    if (foundedUsername) throw new Error("this username is already used.");
    const token = await registerUser(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(201).json("User registered successfully.");
    // res.status(201).json(token)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

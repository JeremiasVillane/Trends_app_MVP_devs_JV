const { NODE_ENV } = require("../../../config");
const { findAccount } = require("../../helpers/findAccount");
const { registerUser } = require("../../controllers/auth.controllers");

module.exports = async (req, res) => {
  const newUser = req.body;
  // console.log(newUser);
  try {
    const foundedEmail = await findAccount(newUser.email);
    const foundedUsername = await findAccount(newUser.username);
    if (foundedEmail) {
      return res
        .status(400)
        .json({ error: "Este correo electrónico ya está en uso" });
    }
    if (foundedUsername) {
      return res
        .status(400)
        .json({ error: "Este nombre de usuario ya está en uso" });
    }

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

const { Admin } = require("../db");
const { verifyToken } = require("../helpers/jwt");

const authenticateAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) throw new Error("Unauthorized.");
    const { id } = await verifyToken(token);
    const foundedUser = await Admin.scope("withoutPassword").findByPk(id);
    // console.log(foundedUser);
    if (!foundedUser) throw new Error("Unauthorized.");
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = authenticateAdmin;

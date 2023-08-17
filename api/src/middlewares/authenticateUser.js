const passport = require("passport");

// Middleware para autenticar al usuario mediante JWT
const authenticateUser = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      // Si no se encuentra un usuario, significa que el token es inválido o ha expirado
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Si el token es válido, almacenamos los datos del usuario en el objeto req.user
    // console.log(user);

    req.user = {
      id: user.id,
      type: user.type,
      username: user.username,
      name: user.name,
      profile_image: user.profile_image,
    };
    next();
  })(req, res, next);
};

module.exports = authenticateUser;

// Middleware que valida si el usuario autenticado
// es una empresa válida o un administrador.
const validateCompany = async (req, res, next) => {
  try {
    // Obtenemos el tipo de usuario (rol) y el ID del usuario autenticado
    // desde la información de la solicitud.
    const { type: userType, id: userId } = req.user;

    // Obtenemos el ID de la empresa desde los parámetros de la solicitud.
    const { id } = req.params;

    // Si el usuario es un administrador, le permitimos
    // continuar con la acción sin más comprobaciones.
    if (userType === "admin") {
      next();
    } else if (userType !== "company" || userId !== id) {
      // Si el usuario no es un administrador y no cumple con las
      // condiciones para ser una empresa válida, responde con un error.
      return res.status(400).json({ error: "Invalid or not authorized user" });
    } else {
      // Si no se cumple ninguna de las condiciones anteriores,
      // el usuario autenticado es una empresa válida
      // y le permitimos continuar con la acción.
      next();
    }
  } catch (error) {
    // Si ocurre algún error durante la validación, respondemos con un error 500.
    return res.status(500).json({ error: "Company validation error" });
  }
};

module.exports = validateCompany;

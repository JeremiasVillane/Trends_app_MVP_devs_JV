const { getUserById, getJobById } = require("../controllers/search.controllers");

// Middleware que valida si el usuario autenticado
// es el dueño del perfil que se desea editar o un administrador.
const validateProfileOwner = async (req, res, next) => {
  try {
    // Obtenemos el ID del usuario autenticado
    // desde la información de la solicitud.
    const { id: userId } = req.user;

    // Obtenemos el ID del perfil que se desea editar
    // desde los parámetros de la solicitud.
    const { id: profileId } = req.params;

    // Obtenemos el tipo de usuario desde la información
    // del usuario autenticado en la solicitud.
    const { type: userType } = req.user;

    // Buscamos el perfil que se desea editar en la base de datos.
    let profileToEdit = await getUserById(profileId);

    // Si no es un usuario, comprobamos si se trata de un trabajo
    if (!profileToEdit) {
      profileToEdit = await getJobById(profileId);
    }

    // Si no se encuentra el perfil, respondemos con un error 404
    // indicando que el usuario no fue encontrado.
    if (!profileToEdit) {
      return res.status(404).json({ error: "User not found" });
    }

    // Guardamos el perfil en la solicitud para que
    // pueda ser accedido por otros middlewares o rutas.
    req.profile = profileToEdit;

    // Si el usuario es un administrador, le permitimos
    // continuar con la acción sin más comprobaciones.
    if (userType === "admin") {
      next();
    } else if (profileToEdit.id !== userId) {
      // Si es un trabajo y el usuario actual es la empresa que lo creó
      // le permitimos continuar con la acción
      if (profileToEdit.jobName && profileToEdit.companyId === userId) {
        next();
      } else {
        // Si el usuario no es un administrador y no es el dueño del perfil
        // que desea editar, responde con un error.
        return res.status(403).json({ error: "Not authorized" });
      }
    } else {
      // Si no se cumple ninguna de las condiciones anteriores,
      // significa que el usuario autenticado es el dueño del perfil
      // y le permitimos continuar con la acción.
      next();
    }
  } catch (error) {
    // Si ocurre algún error durante la validación,
    // respondemos con un error 500.
    return res.status(500).json({ error: "Profile validation error" });
  }
};

module.exports = validateProfileOwner;

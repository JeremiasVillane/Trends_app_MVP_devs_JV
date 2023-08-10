const { getJobById } = require("../controllers/search.controllers");

// Middleware que valida si el usuario autenticado
// es el dueño del trabajo que se desea editar o un administrador.
const validateJobOwner = async (req, res, next) => {
  try {
    // Obtenemos el ID del trabajo desde los parámetros de la solicitud.
    const { id: jobId } = req.params;

    // Obtenemos el tipo de usuario (rol) y el ID de la empresa
    // desde la información del usuario autenticado en la solicitud.
    const { type: userType, id: companyId } = req.user;

    // Buscamos el trabajo que se desea editar o eliminar en la base de datos.
    const jobToEditOrDelete = await getJobById(jobId);

    // Si no se encuentra el trabajo, respondemos con un error 400
    // indicando que el trabajo no fue encontrado.
    if (!jobToEditOrDelete) {
      return res.status(400).json({ error: "Job not found" });
    }

    // Guardamos el trabajo en la solicitud para que pueda
    // ser accedido por otros middlewares o rutas.
    req.job = jobToEditOrDelete;

    // Si el usuario es un administrador, le permitimos
    // continuar con la acción sin más comprobaciones.
    if (userType === "admin") {
      next();
    } else if (jobToEditOrDelete.companyId !== companyId) {
      // Si el usuario no es un administrador y no es el dueño
      // del trabajo que desea editar o eliminar, responde con un error.
      return res.status(400).json({ error: "Not authorized" });
    } else {
      // Si no se cumple ninguna de las condiciones anteriores,
      // significa que el usuario autenticado es el dueño del trabajo
      // y le permitimos continuar con la acción.
      next();
    }
  } catch (error) {
    // Si ocurre algún error durante la validación,
    // respondemos con un error 500.
    return res.status(500).json({ error: "Job validation error" });
  }
};

module.exports = validateJobOwner;

// Middleware que valida si el ID proporcionado es un UUIDv4 válido.
const validateId = (req, res, next) => {
  const { id } = req.params;

  // Expresión regular para validar un UUIDv4
  const uuidv4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  // Verificar si el ID está presente en los parámetros de la solicitud.
  if (!id || id === undefined)
    return res.status(400).json({
      error: "No ID has been entered",
    });

  // Comprobar si el ID es un UUIDv4 válido.
  if (!uuidv4Regex.test(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // Si el ID es válido, continuar con la ejecución
  // del siguiente middleware o ruta.
  next();
};

module.exports = validateId;

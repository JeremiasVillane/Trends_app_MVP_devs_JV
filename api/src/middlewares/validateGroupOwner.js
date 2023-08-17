const { User, ChatGroup } = require("../db");

// Middleware que valida si el usuario que realiza una acción 
// es el dueño del grupo o un administrador/moderador.
const validateGroupOwner = async (req, res, next) => {
  try {
    // Obtenemos el ID del grupo desde los parámetros de la solicitud.
    const { groupId } = req.params;

    // Obtenemos el ID y el tipo de usuario 
    // desde la información del usuario autenticado en la solicitud.
    const { id: userId, type: userType } = req.user;

    // Buscamos el grupo de chat en la base de datos 
    // junto con los usuarios asociados a él.
    const group = await ChatGroup.findByPk(groupId, {
      include: [
        {
          model: User,
          through: {
            attributes: {
              exclude: ["chatGroupId", "createdAt", "updatedAt"],
            },
          },
          attributes: ["id"],
        },
      ],
    });

    // Si el grupo no existe, respondemos con un error 404 
    // indicando que no se encontró el grupo.
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Guardamos el grupo en la solicitud para que 
    // pueda ser accedido por otros middlewares o rutas.
    req.group = group;

    // Si el usuario es un administrador, 
    // le permitimos continuar con la acción.
    if (userType === "admin") {
      next();
    } else {
      // Convertimos el grupo a un objeto plano 
      // para facilitar su manipulación.
      const plainGroup = group.toJSON();

      // Buscamos al usuario actual dentro de 
      // los usuarios asociados al grupo.
      const currentUser = plainGroup.users.filter(
        (user) => user.id === userId
      );

      // Si el usuario actual no se encuentra en la lista de usuarios del grupo, 
      // o la lista está vacía, no está autorizado.
      if (!currentUser || !currentUser.length) {
        return res.status(403).json({ error: "Not authorized" });
      }

      // Obtenemos el rol del usuario actual en el grupo.
      const currentUserRole = currentUser[0].userChatGroup.role;

      // Si el usuario es el dueño del grupo o es un moderador, 
      // le permitimos continuar con la acción.
      if (
        plainGroup.ownerId === userId ||
        currentUserRole === "moderator"
      ) {
        next();
      } else {
        // Si el usuario no es el dueño ni un moderador, 
        // no está autorizado para realizar la acción.
        return res.status(403).json({ error: "Not authorized" });
      }
    }
  } catch (error) {
    // Si ocurre algún error durante la validación, 
    // respondemos con un error 500.
    return res.status(500).json({ error: "Group validation error" });
  }
};

module.exports = validateGroupOwner;

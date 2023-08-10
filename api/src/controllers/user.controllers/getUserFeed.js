const { getUserById, getJobById } = require("../search.controllers");
const { matcher } = require("../../helpers/matchingAlgorithm/matcher.js");
const { User, Company, Job } = require("../../db");
const pagination = require("../../helpers/pagination");

module.exports = async (id, usersType, page, perPage) => {
  let target;

  // Se obtiene el usuario objetivo por su id
  target = await getUserById(id);

  // Si el id no corresponde a un usuario
  // se verifica si es de un trabajo
  if (!target) {
    target = await getJobById(id);
  }
  if (!target) {
    return { error: "Nothing found!" };
  }

  // Se obtiene la lista de usuarios con el type especificado
  let users;

  users = await User.findAll({
    where: { type: usersType },
    attributes: {
      exclude: [
        "password",
        ...(usersType === "student"
          ? ["info_company_name", "info_position"]
          : usersType === "professional"
          ? ["academic_level"]
          : []),
      ],
    },
  });

  if (!users.length) {
    users = await Company.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Job,
        attributes: {
          exclude: ["companyId"],
        },
      },
    });
  }

  if (!users.length) {
    return { error: "No users of the specified type were found" };
  }

  // Se calcula el feed utilizando el algoritmo de matcheo
  const matches = matcher(users, target);

  return pagination(matches, page, perPage);
};

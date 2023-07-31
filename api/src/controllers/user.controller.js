const { getUserById } = require("./search.controller");
const { matcher } = require("../helpers/matchingAlgorithm/matcher.js");
const { User, Company, Job } = require("../db");

const getUserFeed = async (id, usersType) => {
  try {
    // Se obtiene el usuario objetivo por su id
    const targetUser = await getUserById(id);

    // Se verifica que targetUser exista
    if (targetUser && targetUser.error) {
      return { error: targetUser.error };
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

    // Se calcula el feed utilizando el algoritmo de matcheo
    const matches = matcher(users, targetUser);

    return matches;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { getUserFeed };
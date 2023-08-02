const { getUserById } = require("./search.controller");
const { matcher } = require("../helpers/matchingAlgorithm/matcher.js");
const { User, Company, Job } = require("../db");
const { findAccount } = require("../helpers/findAccount");

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

const getUserProfile = async (user) => {
  let foundedUser = null;
  try {
    if (user.type.toLowerCase() === "company")
      foundedUser = await Company.scope(
        "withoutId",
        "withoutPassword"
      ).findByPk(user.id);
    if (user.type.toLowerCase() === "professional")
      foundedUser = await User.scope("withoutId", "withoutPassword").findByPk(
        user.id
      );
    if (user.type.toLowerCase() === "student")
      foundedUser = await User.scope(
        "withoutId",
        "withoutPassword",
        "student"
      ).findByPk(user.id);
    return foundedUser;
  } catch (error) {
    throw new Error("Could not find user in db.");
  }
};

const changeUserPassword = async (userId, newPassword) => {
  try {
    const foundedUser = await findAccount({ id: userId });
    if (!foundedUser)
      throw new Error("No valid user found to change password.");
    if (await foundedUser.comparePassword(newPassword))
      throw new Error(
        "The current password has to be different from the previous one."
      );
    return await foundedUser.update({ password: newPassword });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getUserFeed, getUserProfile, changeUserPassword };

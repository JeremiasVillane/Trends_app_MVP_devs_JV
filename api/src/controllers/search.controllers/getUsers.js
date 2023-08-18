const { Op, Sequelize, fn, col } = require("sequelize");
const { User, Company, Job } = require("../../db");
const pagination = require("../../helpers/pagination");

module.exports = async (queryParams, userType, page, perPage) => {
  const whereClause = {};
  let hasInvalidQuery = false;
  let userAttributes;

  ["student", "professional"].includes(userType) &&
    (userAttributes = Object.keys(User.rawAttributes));

  userType === "company" &&
    (userAttributes = Object.keys(Company.rawAttributes));

  Object.keys(queryParams).forEach((param) => {
    if (userAttributes.includes(param)) {
      const columnType = User.rawAttributes[param]?.type?.key;

      if (columnType === "ARRAY") {
        whereClause[param] = {
          [Op.overlap]: [queryParams[param]],
        };
        whereClause[param] = Sequelize.where(
          fn("array_to_string", col(param), ","),
          {
            [Op.iLike]: `%${queryParams[param]}%`,
          }
        );
      } else if (columnType === "STRING") {
        whereClause[param] = {
          [Op.iLike]: `%${queryParams[param]}%`,
        };
      } else if (columnType === "BOOLEAN") {
        const booleanValue = queryParams[param] === "true";
        whereClause[param] = booleanValue;
      }
    } else {
      hasInvalidQuery = true;
    }
  });

  if (hasInvalidQuery) {
    return { error: "Invalid query" };
  }

  if (userType) {
    whereClause["type"] = {
      [Op.iLike]: `%${userType}%`,
    };
  }

  if (userType === "company") {
    const companies = await Company.findAll({
      where: whereClause,
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

    if (!companies.length) return { error: "No companies found" };

    return pagination(companies, page, perPage);
  }

  const users = await User.findAll({
    where: whereClause,
    attributes: {
      exclude: [
        "password",
        ...(userType === "student"
          ? ["info_company_name", "info_position"]
          : userType === "professional"
          ? ["academic_level"]
          : []),
      ],
    },
  });

  if (!users.length) return { error: "No users found" };

  return pagination(users, page, perPage);
};

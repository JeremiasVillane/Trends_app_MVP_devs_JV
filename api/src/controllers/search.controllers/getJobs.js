const { Op, Sequelize, fn, col } = require("sequelize");
const { Job } = require("../../db");
const pagination = require("../../helpers/pagination");

module.exports = async (queryParams, page, perPage) => {
  const whereClause = {};
  let hasInvalidQuery = false;
  const jobAttributes = Object.keys(Job.rawAttributes);

  Object.keys(queryParams).forEach((param) => {
    if (jobAttributes.includes(param)) {
      const columnType = Job.rawAttributes[param]?.type?.key;

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

  const jobs = await Job.findAll({
    where: whereClause,
  });

  if (!jobs.length) return { error: "No jobs found" };

  return pagination(jobs, page, perPage);
};

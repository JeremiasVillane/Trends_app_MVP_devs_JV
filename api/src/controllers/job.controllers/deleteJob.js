const { Job } = require("../../db");

module.exports = async (id) => {
  const deletedJob = await Job.destroy({ where: { id } });

  return deletedJob;
};

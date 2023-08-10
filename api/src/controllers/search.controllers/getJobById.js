const { Job } = require("../../db");

module.exports = async (id) => {
  const foundJob = await Job.findOne({
    where: { id },
  });

  if (!foundJob) return null;

  return foundJob;
};
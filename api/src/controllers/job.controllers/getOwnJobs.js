const { Job } = require("../../db");

module.exports = async (companyId) => {
  const ownJobs = await Job.findAll({
    where: { companyId },
  });

  if (!ownJobs || !ownJobs.length) {
    return { error: "No jobs found" };
  }

  return ownJobs;
};

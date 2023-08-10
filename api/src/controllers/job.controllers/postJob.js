const { Job } = require("../../db");

module.exports = async (jobData) => {
  const newJob = await Job.create(jobData);

  if (!newJob) {
    return { error: "The job couldn't be created" };
  }

  return newJob;
};

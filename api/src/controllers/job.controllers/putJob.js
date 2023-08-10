module.exports = async (job, jobData) => {
  const updatedJob = await job.update(jobData);

  if (!updatedJob) {
    return { error: "The job couldn't be updated" };
  }

  return updatedJob;
};

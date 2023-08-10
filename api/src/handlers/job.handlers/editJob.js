const { putJob } = require("../../controllers/job.controllers");

module.exports = async (req, res) => {
  try {
    const jobData = req.body;
    const { job } = req;
    const editedJob = await putJob(job, jobData);

    if (editedJob?.error) {
      return res.status(500).json({ error: editedJob.error });
    }

    return res.status(201).json(editedJob);
  } catch (error) {
    return res.status(500).json({ error: "Error updating job" });
  }
};

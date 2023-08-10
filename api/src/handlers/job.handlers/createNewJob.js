const { postJob } = require("../../controllers/job.controllers");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const jobData = req.body;

    const newJob = await postJob({ companyId: id, ...jobData });

    if (newJob?.error) {
      return res.status(500).json({ error: newJob.error });
    }

    return res.status(201).json(newJob);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Error creating new job",
    });
  }
};

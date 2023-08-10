const { deleteJob } = require("../../controllers/job.controllers");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const removedJob = await deleteJob(id);

    if (!removedJob)
      return res.status(400).json({ error: "Job not found" });

    res.status(200).json({ message: "Job successfully removed" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

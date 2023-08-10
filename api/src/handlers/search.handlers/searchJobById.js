const { getJobById } = require("../../controllers/search.controllers");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const jobById = await getJobById(id);

    if (!jobById) {
      return res.status(400).json({ error: "Job not found" });
    }

    res.status(200).json(jobById);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

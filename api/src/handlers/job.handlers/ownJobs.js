const { getOwnJobs } = require("../../controllers/job.controllers");

module.exports = async (req, res) => {
  try {
    const { id: companyId, type } = req.user;

    if (type !== "company") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const foundJobs = await getOwnJobs(companyId);

    if (foundJobs?.error) {
      return res.status(400).json({ error: foundJobs.error });
    }

    return res.status(200).json(foundJobs);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

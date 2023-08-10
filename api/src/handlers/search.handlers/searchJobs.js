const { getJobs } = require("../../controllers/search.controllers");

module.exports = async (req, res) => {
  const queryParams = { ...req.query };
  const page = parseInt(queryParams.page) || 1; // Página actual, por defecto 1
  const perPage = parseInt(req.query.perPage) || 10; // Cantidad por página, por defecto 10
  delete queryParams.page;
  delete queryParams.perPage;

  try {
    const jobs = await getJobs(queryParams, page, perPage);

    if (!jobs) {
      return res.status(500).json({
        error: "No jobs found",
      });
    }

    if (jobs.error)
      return res.status(500).json({
        error: jobs.error,
      });

    res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
const { Router } = require("express");
const { searchUserById, searchUsers, searchJobs, searchJobById } = require("../handlers/search.handlers");
const { validateId } = require("../middlewares");

const searchRoutes = Router();

searchRoutes.get("/user/:id", validateId, searchUserById);
searchRoutes.get("/users", searchUsers);
searchRoutes.get("/job/:id", validateId, searchJobById);
searchRoutes.get("/jobs", searchJobs);

module.exports = searchRoutes;

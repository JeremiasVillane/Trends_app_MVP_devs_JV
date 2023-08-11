const { z } = require("zod");
const authSchemas = require("./auth.schemas");
const profileSchemas = require("./profile.schemas");
const jobSchemas = require("./job.schemas");

const { loginUserSchema, registerUserSchema } = authSchemas(z);
const { companyProfileSchema, userProfileSchema } = profileSchemas(z);
const { jobSchema } = jobSchemas(z);

module.exports = {
  loginUserSchema,
  registerUserSchema,
  // companyProfileSchema,
  userProfileSchema,
  jobSchema,
};

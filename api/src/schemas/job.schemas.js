const stringCharLong = "must be at least 4 characters";

module.exports = (z) => {
  const jobSchema = z.object({
    jobName: z
      .string({
        required_error: "prop: 'jobName' is required.",
      })
      .trim(),
    creationDate: z.coerce.date().min(new Date()),
    closingDate: z.date().min(new Date()).optional(),
    active: z.boolean({
      required_error: "prop: 'active' is required.",
    }),
    levelRequired: z
      .string({
        required_error: "prop: 'levelRequired' is required.",
      })
      .trim(),
    studyArea: z.array(z.string().trim().min(4, { message: `prop: 'studyArea' ${stringCharLong}`})).nonempty({
      message: "prop: 'studyArea' is required.",
    }),
    experienceRequired: z
      .string({
        required_error: "prop: 'experienceRequired' is required.",
      })
      .trim(),
    industry: z.array(z.string().trim().min(2, { message: "prop: 'industry' must be at least 2 characters" })).nonempty({
      message: "prop: 'industry' is required.",
    }),
    benefits: z.array(z.string().trim().min(4, { message: `prop: 'benefits' ${stringCharLong}`})).nonempty({
      message: "prop: 'benefits' is required.",
    }),
    skillsRequired: z.array(z.string().trim().min(4, { message: `prop: 'skillsRequired' ${stringCharLong}`})).nonempty({
      message: "prop: 'skillsRequired' is required.",
    }),
    jobDescription: z.array(z.string().trim().min(4, { message: `prop: 'jobDescription' ${stringCharLong}`})).nonempty({
      message: "prop: 'jobDescription' is required.",
    }),
    jobGoal: z.array(z.string().trim().min(4, { message: `prop: 'jobGoal' ${stringCharLong}`})).nonempty({
      message: "prop: 'jobGoal' is required.",
    }),
    languagesRequired: z.array(z.string().trim()).nonempty({
      message: "prop: 'languagesRequired' is required.",
    }),
    availability: z
      .string({
        required_error: "prop: 'availability' is required.",
      })
      .trim(),
    contractOffered: z
      .string({
        required_error: "prop: 'contractOffered' is required.",
      })
      .trim(),
  });
  return { jobSchema };
};

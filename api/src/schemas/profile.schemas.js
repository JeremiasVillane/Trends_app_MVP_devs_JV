const REGEX_CITIES = /^[A-Za-z\u00C0-\u017F\s',-]+$/;
const REGEX_LETTERS_SPACES = /^[A-Za-z\s]+$/;
const REGEX_NUMBERS = /^\d+$/;
const REGEX_SENTENCE = /^[\w\s.,'"-]+$/;

module.exports = (z) => {
  const isImageUrlOrLocalPath = (value) => {
    return z.string().url().check(value) || (typeof value === 'string' && value.startsWith('src\\uploads\\'));
  };

  const userProfileSchema = z.object({
    type: z.enum(["student", "professional", "company"], {
      required_error: "prop: 'type' is required.",
      invalid_type_error: "'type' must be a: student or professional",
    }),
    email: z
      .string({
        required_error: "prop: 'email' is required.",
      })
      .trim()
      .email({
        message: "Invalid email address.",
      }),
    username: z
      .string({
        required_error: "prop: 'username' is required.",
      })
      .trim()
      .min(3, { message: "prop: 'username' must be at least 3 characters" })
      .max(20, { message: "prop: 'username' must be at most 20 characters" }),
    password: z.string({
      required_error: "prop: 'password' is required",
    }),
    name: z
      .string({
        required_error: "prop: 'name' is required.",
      })
      .trim()
      .min(6)
      .max(30)
      .regex(REGEX_LETTERS_SPACES, { message: "Invalid name format." }),
    profile_support: z
      .boolean({
        invalid_type_error: "'profile_support' must be a boolean.",
      })
      .optional(),
    profile_bio: z.string().trim().optional(),

    //vvvvvvvvvvvvvvvvv- no terminado - vvvvvvvvvvvvvv
    profile_birth: z.coerce
      .date()
      .min(new Date("1970-01-01"), { message: "maximum age allowed 65" })
      .max(new Date(), { message: "minimum age allowed 18" })
      .optional(),
    //^^^^^^^^^^^^^^^^^^no terminado^^^^^^^^^^^^^^^^^^

    profile_image: z.custom(isImageUrlOrLocalPath).optional(),
    profile_city: z
      .string()
      .trim()
      .min(4)
      .regex(REGEX_CITIES, { message: "prop 'city': invalid sentence." })
      .optional(),
    profile_country: z
      .string()
      .trim()
      .min(4)
      .regex(REGEX_SENTENCE, { message: "prop 'contry': invalid sentence." })
      .optional(),
    academic_formation: z
      .string()
      .regex(REGEX_LETTERS_SPACES, {
        message:
          "prop: 'academic_formation': only letters and spaces are accepted.",
      })
      .min(4)
      .optional(),
    academic_institution: z.string().trim().min(4).optional(),
    academic_level: z.string().trim().min(4).optional(),
    academic_area: z.array(z.string().trim().min(4)).optional(),
    academic_graduation: z
      .number()
      .positive()
      .gte(1980)
      .lte(new Date().getFullYear())
      .optional(),
    info_company_name: z.string().trim().min(3).optional(),
    info_position: z.string().trim().min(4).optional(),
    info_career: z.array(z.string().trim().min(4)).optional(),
    info_skills: z.array(z.string().trim().min(4)).optional(),
    info_goals: z.array(z.string().trim().min(4)).optional(),
    info_interests: z.array(z.string().trim().min(4)).optional(),
    info_problematic: z.array(z.string().trim().min(4)).optional(),
    info_languages: z.array(z.string().trim().min(4)).optional(),
    info_availability: z.string().trim().optional(),
    info_contract: z.string().trim().optional(),
    cuit: z
      .string()
      .regex(REGEX_NUMBERS, { message: "prop: 'cuit' must be a number" })
      .optional(),
    bio: z.string().trim().optional(),
    website: z.string().url({
      message: "Invalid website url format.",
    }).optional(),
    image: z.string().url({
      message: "Invalid image url format.",
    }).optional(),
    country: z
      .string()
      .trim()
      .regex(REGEX_SENTENCE, { message: "prop 'country': invalid sentence." })
      .optional()
  });

  // const companyProfileSchema = z.object({
  //   type: z.enum(["company"], {
  //     required_error: "prop: 'type' is required.",
  //     invalid_type_error: "'type' must be a: company.",
  //   }),
  //   email: z
  //     .string({
  //       required_error: "prop: 'email' is required.",
  //     })
  //     .trim()
  //     .email({
  //       message: "Invalid email address.",
  //     }),
  //   username: z
  //     .string({
  //       required_error: "prop: 'username' is required.",
  //     })
  //     .trim()
  //     .min(3, { message: "prop: 'username' must be at least 3 characters" })
  //     .max(20, { message: "prop: 'username' must be at most 20 characters" })
  //     .trim(),
  //   password: z.string({
  //     required_error: "prop: 'password' is required",
  //   }),
  //   name: z
  //     .string({
  //       required_error: "prop: 'name' is required.",
  //     })
  //     .trim()
  //     .regex(REGEX_LETTERS_SPACES, { message: "Invalid name format." }),
  //   cuit: z
  //     .string()
  //     .regex(REGEX_NUMBERS, { message: "prop: 'cuit' must be a number" }),
  //   bio: z.string().trim(),
  //   image: z.string().url({
  //     message: "Invalid url format.",
  //   }),
  //   country: z
  //     .string()
  //     .trim()
  //     .regex(REGEX_SENTENCE, { message: "prop 'contry': invalid sentence." }),
  // });

  // return { companyProfileSchema, userProfileSchema };
  return { userProfileSchema };
};

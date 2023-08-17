module.exports = (z) => {
  const registerUserSchema = z
    .object({
      type: z.enum(["student", "professional", "company"], {
        required_error: "prop: 'type' is required.",
        invalid_type_error:
          "'type' must be a: student, professional or company",
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
        .regex(/^[A-Za-z\s]+$/, { message: "Invalid name format." }),
      profile_support: z
        .boolean({
          invalid_type_error: "'profile_support' must be a boolean.",
        })
        .optional(),
    })
    .superRefine((schema, ctx) => {
      if (schema.type !== "company" && schema.profile_support === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          expected: "boolean",
          received: "undefined",
          path: ["profile_support"],
          message: "prop: 'profile_support' is required.",
        });
      }
    });

  const loginUserSchema = z.object({
    user: z
      .string({
        required_error: "prop: 'user' is required.",
      })
      .trim(),
    password: z.string({
      required_error: "prop: 'password' is required",
    }),
  });

  return { loginUserSchema, registerUserSchema };
};

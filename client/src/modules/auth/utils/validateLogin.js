export const validateLogin = (input) => {
  const { user } = input;
  let errors = {};
  const EMAIL_REGEX =
    /^([\w\-\.]+)@((\[([0-9]{2,3}\.){3}[0-9]{2,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/;

  if (user && user.includes("@")) {
    if (!EMAIL_REGEX.test(user)) {
      errors.user = "Ingrese un email válido o su nombre de usuario";
    }
  }

  return errors;
};

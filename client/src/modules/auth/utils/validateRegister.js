export const validateRegister = (inputs) => {
  const { name, username, email, password, info_interests } = inputs;

  const REGEX_EMAIL =
    /^([\w\-\.]+)@((\[([0-9]{2,3}\.){3}[0-9]{2,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/;
  const REGEX_NAME = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\-=/|]+/;

  let errors = {};

  // Validación del nombre
  if (!name.length || name.length < 2) {
    errors.name = "El nombre de debe tener al menos 2 caracteres";
  }
  if (name.length && name.length > 30) {
    errors.name = "El nombre no puede tener más de 30 caracteres";
  }
  if (REGEX_NAME.test(name)) {
    errors.name =
      "El nombre no puede contener números ni caracteres especiales";
  }

  // Validación del username
  if (!username.length || username.length < 3) {
    errors.username = "El nombre de usuario debe tener al menos 3 caracteres";
  }
  if (username.length && username.length > 33) {
    errors.username =
      "El nombre de usuario no puede tener más de 33 caracteres";
  }

  // Validación del email
  if (!REGEX_EMAIL.test(email)) {
    errors.email = "Ingrese un email válido";
  }
  if (email.length && email.length > 55) {
    errors.email = "El email no puede tener más de 55 caracteres";
  }

  // Validación de la contraseña
  const passwordValidators = {
    hasNumber: {
      regex: /\d/,
      message: "un número",
    },
    hasLowerCase: {
      regex: /[a-z]/,
      message: "una letra minúscula",
    },
    hasUpperCase: {
      regex: /[A-Z]/,
      message: "una letra mayúscula",
    },
    hasSymbol: {
      regex: /\W/,
      message: "un caracter especial",
    },
    hasMinLength: {
      regex: /.{6,}/,
      message: "seis caracteres",
    },
  };

  for (var [validatorName, validatorObj] of Object.entries(
    passwordValidators
  )) {
    if (!validatorObj.regex.test(password)) {
      errors.password = `La contraseña debe tener al menos ${validatorObj.message}`;
    }
  }

  // Validación de los intereses
  // if (info_interests || info_interests.length) {
  //   errors.info_interests = "Elige al menos un interés";
  // }

  return errors;
};

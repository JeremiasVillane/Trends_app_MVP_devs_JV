/**
 * Traduce el 'tipo' de usuario.
 *
 * @param {string} str - Cadena de entrada.
 * @returns {string} Cadena traducida.
 */
export const translateUserType = (str) => {
  let type;

  str === "student" && (type = "Estudiante");
  str === "professional" && (type = "Profesional");
  str === "company" && (type = "Empresa");

  return type;
};

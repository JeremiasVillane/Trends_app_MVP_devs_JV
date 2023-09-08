/**
 * Calcula el porcentaje de completitud de un perfil basado en sus propiedades no nulas.
 *
 * @param {Object} obj - Objeto que representa el perfil del usuario.
 * @returns {number|undefined} Porcentaje de completitud del perfil o undefined si el argumento no es un objeto.
 */
export const profileCompletionPercentage = (obj) => {
  // Verifica si el argumento es un objeto no nulo
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  // Propiedades que no deben considerarse para el cálculo del porcentaje
  const excludedProperties = [
    "info_company_name",
    "info_position",
    "info_availability",
    "info_contract",
  ];

  // Total de propiedades en el objeto
  const totalKeys = Object.keys(obj).length - excludedProperties.length;

  // Contador de propiedades no nulas
  let notNullKeys = 0;

  // Itera a través de las propiedades del objeto
  for (const key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      obj[key] !== null &&
      obj[key] !== undefined &&
      !excludedProperties.includes(key)
    ) {
      notNullKeys++;
    }
  }

  // Calcula el porcentaje total de completitud
  const totalPercentage = (notNullKeys / totalKeys) * 100;

  // Redondea y devuelve el porcentaje calculado
  return totalPercentage.toFixed(0);
};

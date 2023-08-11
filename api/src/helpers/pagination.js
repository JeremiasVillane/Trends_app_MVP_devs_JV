/**
 * Este helper toma un conjunto de datos, un número de página 
 * y la cantidad de elementos por página como entrada,
 * calcula el rango de elementos que deben mostrarse en la página actual 
 * y devuelve un objeto con información de paginación.
 * 
 * El objeto de paginación incluye la página actual, el número total 
 * de páginas y los elementos que se muestran en la página actual.
 *
 * @param {array} data - Conjunto de datos a paginar.
 * @param {number} page - Número de página actual.
 * @param {number} perPage - Cantidad de elementos por página.
 * @returns {object} - Objeto de paginación con información sobre la página actual, total de páginas y elementos en la página actual.
 */

const pagination = async (data, page, perPage) => {
  // Calculamos el índice de inicio y fin para los elementos en la página actual.
  const startIndex = (page - 1) * perPage;
  const EndIndex = startIndex + perPage;

  // Extraemos los elementos que se mostrarán en la página actual.
  const elementsPerPage = data.slice(startIndex, EndIndex);

  // Calculamos el número total de páginas utilizando la longitud 
  // total de los datos y la cantidad de elementos por página.
  const totalPages = Math.ceil(data.length / perPage);

  return {
    currentPage: page,      // Página actual.
    totalPages: totalPages, // Número total de páginas.
    data: elementsPerPage,  // Elementos que se muestran en la página actual.
  };
};

module.exports = pagination;

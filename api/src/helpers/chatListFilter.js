/**
 * Este helper toma una matriz de objetos de chat y una cadena de búsqueda como entrada,
 * convierte la cadena de búsqueda a minúsculas para una comparación sin distinción 
 * entre mayúsculas y minúsculas, y luego filtra los objetos de chat que coinciden 
 * con la cadena de búsqueda en sus campos "name" o "username".
 * 
 * Devuelve una nueva matriz con los objetos de chat filtrados.
 *
 * @param {array} array - Matriz de objetos de chat a filtrar.
 * @param {string} searchString - Cadena de búsqueda para filtrar los objetos de chat.
 * @returns {array} - Nueva matriz de objetos de chat filtrados.
 */

const chatListFilter = (array, searchString) => {
  // Convertimos la cadena de búsqueda a minúsculas para 
  // una comparación sin distinción entre mayúsculas y minúsculas.
  searchString = searchString.toLowerCase();

  // Filtramos la matriz de objetos de chat en función de la cadena de búsqueda.
  return array.filter((obj) => {
    const name = obj.name.toLowerCase();
    const username = obj.username ? obj.username.toLowerCase() : "";

    // Dividimos la cadena de búsqueda en palabras individuales.
    const words = searchString.split(" ");

    // Verificamos si todas las palabras de búsqueda se encuentran 
    // en el campo "name" o "username" del objeto de chat.
    return words.every(
      (word) => name.includes(word) || (obj.username && username.includes(word))
    );
  });
};

module.exports = chatListFilter;

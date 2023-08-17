/**
 * Este helper toma un valor como entrada y verifica si es una cadena de texto,
 * y si esa cadena comienza con "http" (indicando una URL) o "src\\uploads\\" 
 * (indicando una ruta local de imagen).
 * 
 * Devuelve true si el valor es una URL de imagen o una ruta local de imagen; 
 * de lo contrario, devuelve false.
 *
 * @param {string} value - Valor a verificar como URL de imagen o ruta local de imagen.
 * @returns {boolean} - true si el valor es una URL de imagen o una ruta local de imagen; false en caso contrario.
 */

const isImageUrlOrLocalPath = (value) => {

  
  return (
    typeof value === "string" &&
    (value.startsWith("http") || value.includes("/") || value.startsWith("src\\uploads\\"))
  );


};

module.exports = isImageUrlOrLocalPath;



const fs = require("fs");
const path = require("path");

/**
 * Este helper toma una ruta de carpeta y el nombre de una imagen como entrada.
 * Realiza una búsqueda recursiva en la carpeta y sus subcarpetas 
 * para encontrar la imagen deseada.
 * 
 * Devuelve la ruta completa de la imagen si se encuentra; 
 * de lo contrario, devuelve null.
 *
 * @param {string} folderPath - Ruta de la carpeta en la que buscar la imagen.
 * @param {string} imageName - Nombre de la imagen que se desea encontrar.
 * @returns {string | null} - Ruta completa de la imagen si se encuentra; null si no se encuentra.
 */

const findImageRecursively = async (folderPath, imageName) => {
  // Lee la lista de archivos en la carpeta.
  const files = fs.readdirSync(folderPath);

  // Itera a través de cada archivo en la carpeta.
  for (const file of files) {
    const filePath = path.join(folderPath, file);

    // Verifica si el archivo es una carpeta.
    if (fs.statSync(filePath).isDirectory()) {
      // Si es una carpeta, realiza una búsqueda recursiva en la subcarpeta.
      const foundImage = await findImageRecursively(filePath, imageName);
      
      // Si se encuentra la imagen en la subcarpeta, se devuelve la ruta.
      if (foundImage) {
        return foundImage;
      }
      
    // Si se encuentra la imagen en la carpeta actual, se devuelve la ruta.
    } else if (file === imageName) {
      return filePath;
    }
  }

  // Si la imagen no se encuentra en la carpeta actual 
  // ni en sus subcarpetas, se devuelve null.
  return null;
};

module.exports = findImageRecursively;

/*
const fs = require("fs");
const path = require("path");

/*
 * Este helper toma una ruta de carpeta y el nombre de una imagen como entrada.
 * Realiza una búsqueda recursiva en la carpeta y sus subcarpetas 
 * para encontrar la imagen deseada.
 * 
 * Devuelve la ruta completa de la imagen si se encuentra; 
 * de lo contrario, devuelve null.
 *
 * @param {string} folderPath - Ruta de la carpeta en la que buscar la imagen.
 * @param {string} imageName - Nombre de la imagen que se desea encontrar.
 * @returns {string | null} - Ruta completa de la imagen si se encuentra; null si no se encuentra.
 */

const findImageRecursively = async (folderPath, imageName) => {
  // Lee la lista de archivos en la carpeta.
  const files = fs.readdirSync(folderPath);

  // Itera a través de cada archivo en la carpeta.
  for (const file of files) {
    const filePath = path.join(folderPath, file);

    // Verifica si el archivo es una carpeta.
    if (fs.statSync(filePath).isDirectory()) {
      // Si es una carpeta, realiza una búsqueda recursiva en la subcarpeta.
      const foundImage = await findImageRecursively(filePath, imageName);
      
      // Si se encuentra la imagen en la subcarpeta, se devuelve la ruta.
      if (foundImage) {
        return foundImage;
      }
      
    // Si se encuentra la imagen en la carpeta actual, se devuelve la ruta.
    } else if (file === imageName) {
      return filePath;
    }
  }

  // Si la imagen no se encuentra en la carpeta actual 
  // ni en sus subcarpetas, se devuelve null.
  return null;
};

module.exports = findImageRecursively;
*/

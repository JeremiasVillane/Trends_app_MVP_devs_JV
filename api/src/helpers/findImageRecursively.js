const fs = require("fs").promises;
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
 * @returns {Promise<string | null>} - Ruta completa de la imagen si se encuentra; null si no se encuentra.
 */

const findImageRecursively = async (folderPath, imageName) => {
  try {
    // Lee la lista de archivos en la carpeta.
    const files = await fs.readdir(folderPath);

    // Itera a través de cada archivo en la carpeta.
    for (const file of files) {
      const filePath = path.join(folderPath, file);

      // Obtiene información sobre el archivo.
      const fileStats = await fs.stat(filePath);

      // Verifica si el archivo es una carpeta.
      if (fileStats.isDirectory()) {
        // Si es una carpeta, realiza una búsqueda recursiva en la subcarpeta.
        const foundImage = await findImageRecursively(filePath, imageName);

        // Si se encuentra la imagen en la subcarpeta, se devuelve la ruta.
        if (foundImage) {
          return foundImage;
        }
      } else if (file === imageName) {
        // Si se encuentra la imagen en la carpeta actual, se devuelve la ruta.
        return filePath;
      }
    }

    // Si la imagen no se encuentra en la carpeta actual ni en sus subcarpetas, se devuelve null.
    return null;
  } catch (error) {
    // Manejo de errores.
    console.error(error.message || error);
    return { error: "Error searching images" };
  }
};

module.exports = findImageRecursively;

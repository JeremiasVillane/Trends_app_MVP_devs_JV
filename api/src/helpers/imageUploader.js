const multer = require("multer");
const path = require("path");

/**
 * Este helper toma una ubicación de destino como entrada, 
 * crea una instancia de multer con opciones de almacenamiento y filtrado,
 * y devuelve la instancia de multer configurada para la subida de archivos.
 *
 * @param {string} destination - Ruta de la carpeta donde se guardarán los archivos subidos.
 * @returns {object} - Instancia configurada de multer para la subida de archivos.
 */

const configureUpload = (destination) => {
  // Configuramos el almacenamiento de multer para especificar 
  // la carpeta de destino y el nombre de archivo.
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  });

  // Función para verificar el tipo de archivo permitido (extensiones y tipos MIME).
  const checkFileType = function (file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const extName = fileTypes.test(path.extname(file.originalname));
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Upload Images Only!!");
    }
  };

  // Configuramos la instancia de multer con opciones de almacenamiento, 
  // límites de tamaño y función de filtrado.
  const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // Límite de tamaño de archivo en bytes (10 MB en este caso).
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  });

  // Devolvemos la instancia de multer configurada para la subida de archivos.
  return upload;
};

module.exports = configureUpload;

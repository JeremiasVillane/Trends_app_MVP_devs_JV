const fs = require("fs");
const path = require("path");

const findImageRecursively = async (folderPath, imageName) => {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      const foundImage = await findImageRecursively(filePath, imageName);
      if (foundImage) {
        return foundImage;
      }
    } else if (file === imageName) {
      return filePath;
    }
  }

  return null;
};

module.exports = findImageRecursively;

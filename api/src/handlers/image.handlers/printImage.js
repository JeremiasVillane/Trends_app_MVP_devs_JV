const path = require("path");

const findImageRecursively = require("../../helpers/findImageRecursively");

module.exports = async (req, res) => {
  const { imageName } = req.params;

  const imageUploadPath = path.resolve("src/uploads");

  const imagePath = await findImageRecursively(imageUploadPath, imageName);

  if (imagePath) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: "Image not found" });
  }
};

const { getImage } = require("../../controllers/image.controllers");

module.exports = async (req, res) => {
  try {
    const { imageId } = req.params;

    const foundImage = await getImage(imageId);

    if (foundImage?.error) {
      return res.status(400).json({ error: foundImage.error });
    }

    return res.status(200).json(foundImage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to retrive image from database" });
  }
};

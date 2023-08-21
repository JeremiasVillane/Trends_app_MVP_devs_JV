const { getImages } = require("../../controllers/image.controllers");

module.exports = async (req, res) => {
  try {
    const foundImages = await getImages();

    if (foundImages?.error) {
      return res.status(400).json({ error: foundImages.error });
    }

    res.status(200).json(foundImages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

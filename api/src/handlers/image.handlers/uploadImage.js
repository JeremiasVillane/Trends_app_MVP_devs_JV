const { postImage } = require("../../controllers/image.controllers");

module.exports = async (req, res) => {
  const { id, type } = req.user;
  const { filename, path } = req.file;

  try {
    const uploadedImage = await postImage(id, type, filename, path);

    if (uploadedImage?.error) {
      return res.status(400).json({ error: uploadedImage.error });
    }

    res.status(200).json(uploadedImage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error uploading image" });
  }
};

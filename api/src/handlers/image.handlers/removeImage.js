const { deleteImage } = require("../../controllers/image.controllers");

module.exports = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { id: currentUserId, type: currentUserType } = req.user;

    const removedImage = await deleteImage(
      imageId,
      currentUserId,
      currentUserType
    );

    if (!removedImage) {
      return res.status(500).json({ error: "Failed to remove image" });
    }

    if (removedImage?.error) {
      return res.status(400).json({ error: removedImage.error });
    }

    return res
      .status(200)
      .json({ message: "Image and reference deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: "Error deleting image reference from the database" });
  }
};

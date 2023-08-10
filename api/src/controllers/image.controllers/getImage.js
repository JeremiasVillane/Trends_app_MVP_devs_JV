const { conn } = require("../../db");

module.exports = async (imageId) => {
  try {  
    const query = `
      SELECT * FROM images
      WHERE id = :imageId
    `;
  
    const result = await conn.query(query, {
      replacements: { imageId },
      type: conn.QueryTypes.SELECT,
    });
  
    if (result.length === 0) {
      return { error: "No images found" };
    }
  
    return result[0];
  } catch (error) {
    console.error(error.message);
    return { error: "Failed to retrieve image from database" };
  }
};

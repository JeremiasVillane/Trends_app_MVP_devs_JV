const isImageUrlOrLocalPath = (value) => {
  return (
    typeof value === "string" &&
    (value.startsWith("http") || value.startsWith("src\\uploads\\"))
  );
};

module.exports = isImageUrlOrLocalPath;

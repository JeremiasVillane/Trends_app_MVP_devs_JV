module.exports = async (group, name, image) => {
  name && (group.name = name);
  image && (group.image = image);

  await group.save();

  return group;
};

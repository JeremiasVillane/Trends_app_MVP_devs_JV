module.exports = async (profile, profileData) => {
  const updatedProfile = await profile.update(profileData);

  return updatedProfile;
};

module.exports = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

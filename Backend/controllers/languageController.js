const Language = require("../models/language");

console.log(Language);

// Get all Language
exports.getAllLanguages = async (req, res) => {
  try {
    const language = await Language.findAll();
    res.json(language);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const express = require("express");
const router = express.Router();
//const genresController = require("../controllers/genresController");

// GET all language
router.get("/", (req, res) => {
  res.send("hi language");
});

module.exports = router;

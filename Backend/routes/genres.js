const express = require("express");
const router = express.Router();
//const genresController = require("../controllers/genresController");

// GET all genres
router.get("/", (req, res) => {
  res.send("hi");
});

module.exports = router;

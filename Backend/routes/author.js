const express = require("express");
const router = express.Router();
//const genresController = require("../controllers/genresController");

// GET all authors
router.get("/", (req, res) => {
  res.send("hi author");
});

module.exports = router;

const express = require("express");
const router = express.Router();
//const genresController = require("../controllers/genresController");

// GET all books
router.get("/", (req, res) => {
  res.send("hi book");
});

module.exports = router;

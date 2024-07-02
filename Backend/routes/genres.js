const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genresController");

// GET all genres
router.get("/", genresController.getAllGenres);

//create genres
router.post("/", genresController.createGenres);

router.get("/:id", genresController.getGenresById);
router.put("/:id", genresController.updateGenres);
router.delete("/:id", genresController.deleteGenres);
module.exports = router;

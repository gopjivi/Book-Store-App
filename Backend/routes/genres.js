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

//check  name for create
router.get("/genrename_available/:name", genresController.checkGenreNameExists);

router.get(
  "/countbook/genresbook/",
  genresController.getAllGenresWithBookCount
);

module.exports = router;

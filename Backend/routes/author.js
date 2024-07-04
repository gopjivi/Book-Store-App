const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// GET all authors
router.get("/", authorController.getAllAuthors);

//create author
router.post("/", authorController.createAuthor);

router.get("/:id", authorController.getAuthorById);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;

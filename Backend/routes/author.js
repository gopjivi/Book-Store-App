const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

// GET all authors
router.get("/", authorController.getAllAuthors);

//create author
router.post("/", authorController.createAuthor);

router.get("/:id", authorController.getAuthorById);
//check author display name for create
router.get(
  "/authorname_available/:name",
  authorController.checkAuthorNameExists
);

//check author display name for edit
router.get(
  "/authorname_available_edit/:id/:name",
  authorController.checkAuthorNameExistsForEdit
);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;

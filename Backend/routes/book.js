const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// GET all books
router.get("/", bookController.getAllBooks);

//create books
router.post("/", bookController.createBook);

router.get("/:id", bookController.getBookById);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;

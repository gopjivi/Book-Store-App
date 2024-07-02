const express = require("express");
const router = express.Router();
const languageController = require("../controllers/languageController");

// GET all language
router.get("/", languageController.getAllLanguages);

module.exports = router;

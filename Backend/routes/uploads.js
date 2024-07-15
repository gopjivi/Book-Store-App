const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadsController");

// POST route for uploading a file
router.post(
  "/",
  uploadController.upload.single("file"),
  uploadController.uploadFile
);

// PUT route for replacing an existing file
router.put(
  "/:filename",
  uploadController.upload.single("file"),
  uploadController.replaceFile
);

// DELETE route for deleting a file
router.delete("/:filename", uploadController.deleteFile);

module.exports = router;
module.exports = router;

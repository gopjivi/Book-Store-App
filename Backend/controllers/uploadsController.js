const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const uploadFile = (req, res) => {
  console.log(req.body);
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  console.log("file uploading");
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
};

const replaceFile = (req, res) => {
  const newFilename = req.params.filename;
  console.log(req.body);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const newPath = path.join(__dirname, "..", "uploads", newFilename);

  if (fs.existsSync(newPath)) {
    try {
      fs.unlinkSync(newPath);
    } catch (err) {
      console.error("Error deleting existing file:", err);
      return res.status(500).json({ error: "Failed to replace file" });
    }
  }
  fs.rename(req.file.path, newPath, (err) => {
    if (err) {
      console.error("Error moving file:", err);
      return res.status(500).json({ error: "Failed to replace file" });
    }
    res.json({
      message: "File replaced successfully",
      filename: newFilename,
    });
  });
};

const deleteFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "uploads", filename);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting file" });
      }

      res.status(200).json({ message: "File deleted successfully" });
    });
  });
};

module.exports = {
  upload,
  uploadFile,
  replaceFile,
  deleteFile,
};

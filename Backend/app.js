const express = require("express");
const sequelize = require("./models");
const genresModel = require("./models/genres");
const bookModel = require("./models/book");
const languageModel = require("./models/language");
const authorModel = require("./models/author");
const fs = require("fs");
const multer = require("multer");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const path = require("path");

app.use(express.json());

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.body);
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  console.log("file uploading");
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

// PUT method for replacing an existing file
app.put("/upload/:filename", upload.single("file"), (req, res) => {
  const newFilename = req.params.filename;
  console.log(req.body);

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Construct new file path with new filename
  const newPath = path.join(__dirname, "uploads", newFilename);

  // Rename existing file if it exists
  if (fs.existsSync(newPath)) {
    try {
      fs.unlinkSync(newPath);
    } catch (err) {
      console.error("Error deleting existing file:", err);
      return res.status(500).json({ error: "Failed to replace file" });
    }
  }

  // Move uploaded file to new path with new filename
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
});

// Serve files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Model Association
bookModel.belongsTo(authorModel, {
  foreignKey: "author_id",
  allowNull: false,
  onDelete: "CASCADE",
});
bookModel.belongsTo(genresModel, { foreignKey: "genre_id", allowNull: false });
bookModel.belongsTo(languageModel, {
  foreignKey: "language_id",
  allowNull: false,
});

authorModel.hasMany(bookModel, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
});
genresModel.hasMany(bookModel, { foreignKey: "genre_id" });
languageModel.hasMany(bookModel, { foreignKey: "language_id" });

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

//database syncronize
sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing models:", err);
  });

// Import routes
const genresRoutes = require("./routes/genres");
const bookRoutes = require("./routes/book");
const authorRoutes = require("./routes/author");
const languageRoutes = require("./routes/language");

app.use("/genres", genresRoutes);
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/languages", languageRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Express-Sequelize demo!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

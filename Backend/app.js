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
const uploadRoutes = require("./routes/uploads");

app.use("/genres", genresRoutes);
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/languages", languageRoutes);
app.use("/uploads", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Express-Sequelize demo!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

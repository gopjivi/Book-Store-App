const express = require("express");
const sequelize = require("./db");
const genresModel = require("./models/genres");
const bookModel = require("./models/book");
const languageModel = require("./models/language");
const authorModel = require("./models/author");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

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

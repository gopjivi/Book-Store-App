const express = require("express");
const sequelize = require("./db");
const genresModel = require("./models/genres");
const bookModel = require("./models/book");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

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
app.use("/genres", genresRoutes);
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Express-Sequelize demo!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const { Sequelize } = require("sequelize");

// Initialize Sequelize
const sequelize = new Sequelize("bookstore", "root", "Hanumika1!", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;

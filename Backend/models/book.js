// models/books.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Book = sequelize.define("Book", {
  book_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  publication_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  image_URL: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Authors",
      key: "author_id",
    },
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Languages",
      key: "language_id",
    },
  },
});

module.exports = Book;

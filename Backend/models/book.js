// models/books.js
const { DataTypes } = require("sequelize");
const sequelize = require(".");

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
  edition: {
    type: DataTypes.STRING,
    allowNull: true,
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

  storage_section: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storage_shelf: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_offer_available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Genres",
      key: "genre_id",
    },
  },
});

module.exports = Book;

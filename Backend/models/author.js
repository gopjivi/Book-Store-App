// models/author.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const author = sequelize.define("Author", {
  author_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  biography: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = author;

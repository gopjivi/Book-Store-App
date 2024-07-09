// models/author.js
const { DataTypes } = require("sequelize");
const sequelize = require(".");

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
  display_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  biography: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = author;

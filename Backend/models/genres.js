// models/genres.js
const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Genre = sequelize.define("Genres", {
  genre_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  genre_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Genre;

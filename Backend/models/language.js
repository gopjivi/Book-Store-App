// models/languagejs
const { DataTypes } = require("sequelize");
const sequelize = require(".");

const language = sequelize.define("Language", {
  language_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  language_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = language;

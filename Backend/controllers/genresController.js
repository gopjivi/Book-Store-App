const Genres = require("../models/genres");
const Book = require("../models/book");
const sequelize = require("../models");

console.log(Genres);
// Create a new Genres
exports.createGenres = async (req, res) => {
  try {
    const genres = await Genres.create(req.body);
    res.status(201).json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Genres
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genres.findAll();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Genre by ID
exports.getGenresById = async (req, res) => {
  try {
    const genres = await Genres.findByPk(req.params.id);
    console.log(genres);
    if (genres) {
      res.json(genres);
    } else {
      res.status(404).json({ error: "Genre not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Genre
exports.updateGenres = async (req, res) => {
  try {
    const [updated] = await Genres.update(req.body, {
      where: { genre_id: req.params.id },
    });
    console.log("updated", updated);
    if (updated) {
      const updatedGenres = await Genres.findByPk(req.params.id);
      res.json(updatedGenres);
    } else {
      res.status(404).json({ error: "Genre not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Genre
exports.deleteGenres = async (req, res) => {
  try {
    const deleted = await Genres.destroy({
      where: { genre_id: req.params.id },
    });
    console.log("deleted", deleted);
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Genre not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//check genre  name on create
exports.checkGenreNameExists = async (req, res) => {
  try {
    const genre = await Genres.findAll({
      where: { genre_name: req.params.name },
    });
    console.log(genre);
    const exists = genre.length > 0;
    res.status(200).json({ isExists: exists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllGenresWithBookCount = async (req, res) => {
  try {
    console.log("book count mapping comming");
    const query = `
      SELECT
          G.genre_id,
          G.genre_name,
          COUNT(B.book_id) AS BookCount
      FROM
          Genres G
      LEFT JOIN
          Books B
      ON
          G.genre_id = B.genre_id
      GROUP BY
          G.genre_id, G.genre_name;
    `;

    const results = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

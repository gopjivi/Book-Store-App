const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genres");
const Language = require("../models/language");

console.log(Book);
// Create a new Book
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all Book
exports.getAllBooks = async (req, res) => {
  try {
    // const books = (await Book.findAll());

    const books = await Book.findAll({
      order: [["book_id", "DESC"]],
      include: [
        {
          model: Author,
          attributes: ["name"], // Specify the fields you want from the Author model
        },
        {
          model: Language,
          attributes: ["language_name"], // Specify the fields you want from the Author model
        },
      ],
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a Book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Author,
          attributes: ["display_name"], // Specify the fields you want from the Author model
        },
        {
          model: Language,
          attributes: ["language_name"], // Specify the fields you want from the Language model
        },
        {
          model: Genre,
          attributes: ["genre_name"], // Specify the fields you want from the Author model
        },
      ],
    });
    console.log(book);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Book
exports.updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { book_id: req.params.id },
    });
    console.log("updated", updated);
    if (updated) {
      const updatedBook = await Book.findByPk(req.params.id);
      res.json(updatedBook);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Book
exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { book_id: req.params.id },
    });
    console.log("deleted", deleted);
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

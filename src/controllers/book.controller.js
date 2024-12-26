const Book = require("../models/book.model");

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear } = req.body;

    if (!title || !author || !genre || !publishedYear) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const book = await Book.create({ title, author, genre, publishedYear });
    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    console.error("Error creating book:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update book by ID
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, publishedYear } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, publishedYear },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    console.error("Error updating book:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete book by ID
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (error) {
    console.error("Error deleting book:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};

const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");

// Route to create a new book
router.post("/", createBook);

// Route to get all books
router.get("/", getBooks);

// Route to get a book by ID
router.get("/:id", getBookById);

// Route to update a book by ID
router.put("/:id", updateBook);

// Route to delete a book by ID
router.delete("/:id", deleteBook);

module.exports = router;

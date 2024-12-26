const express = require("express");
const router = express.Router();
const {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author.controller");

// Route to create a new author
router.post("/", createAuthor);

// Route to get all authors
router.get("/", getAuthors);

// Route to get an author by ID
router.get("/:id", getAuthorById);

// Route to update an author by ID
router.put("/:id", updateAuthor);

// Route to delete an author by ID
router.delete("/:id", deleteAuthor);

module.exports = router;

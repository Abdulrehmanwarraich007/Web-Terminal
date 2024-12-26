const Author = require("../models/author.model");

// Create a new author
const createAuthor = async (req, res) => {
  try {
    const { name, birthdate, nationality } = req.body;

    if (!name || !birthdate || !nationality) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const author = await Author.create({ name, birthdate, nationality });
    res.status(201).json({ message: "Author created successfully", author });
  } catch (error) {
    console.error("Error creating author:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all authors
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get author by ID
const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid author ID" });
    }

    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(author);
  } catch (error) {
    console.error("Error fetching author:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update author by ID
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthdate, nationality } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid author ID" });
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { name, birthdate, nationality },
      { new: true, runValidators: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Author updated successfully", updatedAuthor });
  } catch (error) {
    console.error("Error updating author:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete author by ID
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid author ID" });
    }

    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Author deleted successfully", deletedAuthor });
  } catch (error) {
    console.error("Error deleting author:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};

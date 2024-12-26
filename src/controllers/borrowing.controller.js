const Borrowing = require("../models/borrowing.model");

// Create a new borrowing record
const createBorrowing = async (req, res) => {
  try {
    const { bookId, borrowerId, borrowDate, returnDate } = req.body;

    if (!bookId || !borrowerId || !borrowDate) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const borrowing = await Borrowing.create({ bookId, borrowerId, borrowDate, returnDate });
    res.status(201).json({ message: "Borrowing record created successfully", borrowing });
  } catch (error) {
    console.error("Error creating borrowing record:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all borrowing records
const getBorrowings = async (req, res) => {
  try {
    const borrowings = await Borrowing.find().populate("bookId borrowerId");
    res.status(200).json(borrowings);
  } catch (error) {
    console.error("Error fetching borrowing records:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a borrowing record by ID
const getBorrowingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid borrowing ID" });
    }

    const borrowing = await Borrowing.findById(id).populate("bookId borrowerId");
    if (!borrowing) {
      return res.status(404).json({ message: "Borrowing record not found" });
    }

    res.status(200).json(borrowing);
  } catch (error) {
    console.error("Error fetching borrowing record:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a borrowing record by ID
const updateBorrowing = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookId, borrowerId, borrowDate, returnDate } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid borrowing ID" });
    }

    const updatedBorrowing = await Borrowing.findByIdAndUpdate(
      id,
      { bookId, borrowerId, borrowDate, returnDate },
      { new: true, runValidators: true }
    );

    if (!updatedBorrowing) {
      return res.status(404).json({ message: "Borrowing record not found" });
    }

    res.status(200).json({ message: "Borrowing record updated successfully", updatedBorrowing });
  } catch (error) {
    console.error("Error updating borrowing record:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a borrowing record by ID
const deleteBorrowing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid borrowing ID" });
    }

    const deletedBorrowing = await Borrowing.findByIdAndDelete(id);

    if (!deletedBorrowing) {
      return res.status(404).json({ message: "Borrowing record not found" });
    }

    res.status(200).json({ message: "Borrowing record deleted successfully", deletedBorrowing });
  } catch (error) {
    console.error("Error deleting borrowing record:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createBorrowing,
  getBorrowings,
  getBorrowingById,
  updateBorrowing,
  deleteBorrowing,
};

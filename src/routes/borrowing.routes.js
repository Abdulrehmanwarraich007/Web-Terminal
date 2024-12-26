const express = require("express");
const router = express.Router();
const {
  createBorrowing,
  getBorrowings,
  getBorrowingById,
  updateBorrowing,
  deleteBorrowing,
} = require("../controllers/borrowing.controller");

// Create a new borrowing record
router.post("/", createBorrowing);

// Get all borrowing records
router.get("/", getBorrowings);

// Get a borrowing record by ID
router.get("/:id", getBorrowingById);

// Update a borrowing record by ID
router.put("/:id", updateBorrowing);

// Delete a borrowing record by ID
router.delete("/:id", deleteBorrowing);

module.exports = router;

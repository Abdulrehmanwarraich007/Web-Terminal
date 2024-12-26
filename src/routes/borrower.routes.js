const express = require("express");
const router = express.Router();
const {
  createBorrower,
  getBorrowers,
  getBorrowerById,
  updateBorrower,
  deleteBorrower,
} = require("../controllers/borrower.controller");

// Create a new borrower
router.post("/", createBorrower);

// Get all borrowers
router.get("/", getBorrowers);

// Get a borrower by ID
router.get("/:id", getBorrowerById);

// Update a borrower by ID
router.put("/:id", updateBorrower);

// Delete a borrower by ID
router.delete("/:id", deleteBorrower);

module.exports = router;

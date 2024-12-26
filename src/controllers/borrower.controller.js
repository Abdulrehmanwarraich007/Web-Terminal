const Borrower = require("../models/borrower.model");

// Create a new borrower
const createBorrower = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;

    if (!name || !email || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const borrower = await Borrower.create({ name, email, phoneNumber });
    res.status(201).json({ message: "Borrower created successfully", borrower });
  } catch (error) {
    console.error("Error creating borrower:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all borrowers
const getBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.find();
    res.status(200).json(borrowers);
  } catch (error) {
    console.error("Error fetching borrowers:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a borrower by ID
const getBorrowerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid borrower ID" });
    }

    const borrower = await Borrower.findById(id);
    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    res.status(200).json(borrower);
  } catch (error) {
    console.error("Error fetching borrower:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a borrower by ID
const updateBorrower = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid borrower ID" });
    }

    const updatedBorrower = await Borrower.findByIdAndUpdate(
      id,
      { name, email, phoneNumber },
      { new: true, runValidators: true }
    );

    if (!updatedBorrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    res.status(200).json({ message: "Borrower updated successfully", updatedBorrower });
  } catch (error) {
    console.error("Error updating borrower:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a borrower by ID
const deleteBorrower = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid borrower ID" });
    }

    const deletedBorrower = await Borrower.findByIdAndDelete(id);

    if (!deletedBorrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    res.status(200).json({ message: "Borrower deleted successfully", deletedBorrower });
  } catch (error) {
    console.error("Error deleting borrower:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createBorrower,
  getBorrowers,
  getBorrowerById,
  updateBorrower,
  deleteBorrower,
};

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/database");

// Routes
const authorRoutes = require("./routes/author.routes");
const borrowerRoutes = require("./routes/borrower.routes");
const borrowingRoutes = require("./routes/borrowing.routes");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// MongoDB connection
connectDB();

// Routes
app.use("/api/authors", authorRoutes);
app.use("/api/borrowers", borrowerRoutes);
app.use("/api/borrowings", borrowingRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Web Terminal API!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

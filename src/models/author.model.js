const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author name is required"],
  },
  birthdate: {
    type: Date,
    required: [true, "Author birthdate is required"],
  },
  nationality: {
    type: String,
    required: [true, "Author nationality is required"],
  },
});

module.exports = mongoose.model("Author", authorSchema);

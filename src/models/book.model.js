const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
  },
  author: {
    type: String,
    required: [true, "Book author is required"],
  },
  genre: {
    type: String,
    required: [true, "Book genre is required"],
  },
  publishedYear: {
    type: Number,
    required: [true, "Published year is required"],
  },
});

module.exports = mongoose.model("Book", bookSchema);

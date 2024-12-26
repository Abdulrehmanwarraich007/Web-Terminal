const mongoose = require('mongoose');

// Replace with your actual database name or set it in a .env file.
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/web_terminal'; // 'web_terminal' is the database name

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

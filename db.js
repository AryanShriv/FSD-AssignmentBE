// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env
console.log(process.env.DB_URL)
const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.DB_URL, {
      await mongoose.connect("mongodb://0.0.0.0:27017/fsd-backend", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;

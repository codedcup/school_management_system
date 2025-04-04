const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    const connection = await mongoose.connect(url);
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

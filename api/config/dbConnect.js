const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB👍");
  } catch (error) {
    console.error("MongoDB connection error😞:", error.message);
  }
};

module.exports = connectToMongoDB;

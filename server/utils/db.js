const mongoose = require("mongoose");
const logger = require("./logger");

const connectDB = async (mongoURL) => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("MongoDB connected successfully!");
    })
    .catch((error) => {
      logger.error("MongoDB connection failed:", error);
      process.exit(1);
    });
};

module.exports = connectDB;

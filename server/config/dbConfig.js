// Importing necessary libraries and modules
const mongoose = require("mongoose");

// Connecting to the MongoDB database
const dbConnect = async () => {
  try {
    // Connecting to the MongoDB database using the MONGODB_URL from the .env file if available, or a default MongoDB URL if not
    const dbURL =
      (await mongoose.connect(process.env.DATABASE_URL)) ||
      "mongodb://127.0.0.1:27017/tweet-nest";

    if (mongoose.connection.readyState === 1) {
      // Retrieve the name of the database to which the connection has been established.
      const dbName = mongoose.connection.db.databaseName;
      console.log(`Connected to the ${dbName} database successfully`);
    } else {
      console.log("No database connection established.");
    }
  } catch (error) {
    console.log("Database Error", error);
  }
};

module.exports = dbConnect;
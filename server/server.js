// Importing necessary libraries and modules
const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConfig");
const cors = require("cors");
// const cookieParser = require("cookie-parser");

// Creating an Express application
const app = express();

// Setting up the server port, default to 4000
const PORT = process.env.PORT || 4000;

// Connecting to the database
dbConnect();

// Body parsing middleware of incoming JSON requests
app.use(express.json());

// Log the incoming JSON data (Middleware)
app.use((req, res, next) => {
  console.log("Incoming JSON data:", req.body); 
  next();
});

// Setting up CORS middleware to handle cross-origin requests
app.use(cors());

// Configuring CookieParser
// app.use(cookieParser());

// Including the models
require("./models/userModel");
require("./models/tweetModel");

//Including the routes
app.use(require("./routes/authRoutes"));
app.use(require("./routes/userRoutes"));
app.use(require("./routes/tweetRoutes"));
app.use(require("./routes/fileRoutes"));

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

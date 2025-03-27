// Authentication-related routes (register, login)
// Importing necessary libraries and modules
const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/api/auth/register", authController.register);
authRouter.post("/api/auth/login", authController.login);

// Exporting the Router
module.exports = authRouter;

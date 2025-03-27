// Importing necessary libraries and modules
const JWT = require("jsonwebtoken"); // Importing JWT for token verification
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel"); // Importing the User model

const protectedRoute = async (req, res, next) => {
	try {
		//Extracts the "authorization" header from the request, which contains a JWT token.
		const { authorization } = req.headers;
		// Check if the user is not logged in (no authorization token)
		if (!authorization) {
			return res
				.status(401)
				.json({ error: "Authentication is required. Please log in." });
		}

		//Bearer hlcjhjlnvlnv
		// Extracting the token (remove "Bearer" prefix)
		const token = authorization.split(" ")[1];

		// Verifying the JWT token
		const payload = JWT.verify(token, process.env.SECRET_KEY);

		const { _id } = payload;

		// Finding the user based on the ID extracted from the token
		const dbUser = await UserModel.findById(_id);

		if (!dbUser) {
			return res.status(401).json({ error: "User not found. Please log in." });
		}

		// Attaching the user object to the request for use in subsequent middleware or routes
		req.user = dbUser;
		next(); // Continue to the next middleware or route
	} catch (error) {
		console.error(error);
		return res
			.status(401)
			.json({ error: "Authentication failed. Please log in." });
	}
};

module.exports = protectedRoute;

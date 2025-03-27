// Authentication-related controllers (register and login)
// Importing necessary libraries and modules
const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs"); // Importing bcryptjs for password hashing
const JWT = require("jsonwebtoken"); // Importing JWT for token generation

// Register Controller
exports.register = async (req, res) => {
	// Extract user data from the request body
	const { fullName, username, email, password, profilePicture } = req.body;

	try {
		// Checking if required fields are missing
		if (!fullName || !username || !email || !password) {
			return res.status(400).json({
				error: "All fields are required. Please fill in all the details.",
			});
		}

		// Checking if the email already exists in the database
		const userEmailExists = await userModel.findOne({ email: email });
		if (userEmailExists) {
			return res.status(409).json({
				error:
					"Email address is already registered. Please use a different email.",
			});
		}

		// Checking if the username already exists in the database
		const usernameExists = await userModel.findOne({ username: username });
		if (usernameExists) {
			return res.status(409).json({
				error: "Username is already taken. Please choose a different username.",
			});
		}

		// Hashing the password
		const hashedPassword = await bcryptjs.hash(password, 16);

		// Creating a new user with the userModel
		const newUser = new userModel({
			fullName,
			username,
			email,
			password: hashedPassword,
			profilePicture,
		});

		// Saving the new user to the database
		await newUser.save();

		// Generating JWT token
		const JWTToken = JWT.sign({ _id: newUser._id }, process.env.SECRET_KEY);

		// Setting the token in the cookie
		res
			.cookie("access_token", JWTToken, { httpOnly: true })
			.status(201)
			.json({ success: true, message: "User signed up successfully!" });
	} catch (error) {
		console.error("Error during user registration:", error);
		res.status(500).json({
			error:
				"An error occurred during user registration. Please try again later.",
		});
	}
};

// Login Controller
exports.login = async (req, res) => {
	// Extract email and password from the request body
	const { email, password } = req.body;

	try {
		// Checking if required fields are missing
		if (!email || !password) {
			return res
				.status(400)
				.json({ error: "Email and password are required fields." });
		}

		// Checking if the email exists in the database
		const userExists = await userModel.findOne({ email: email });
		if (!userExists) {
			return res.status(401).json({ error: "Invalid email or password." });
		}

		// Comparing the password with the hashed password stored in the database
		const passwordMatch = await bcryptjs.compare(password, userExists.password);

		// Checking if the password provided by the user matches the hashed password stored in the database
		if (passwordMatch) {
			// Creating a JWT token with user information
			const JWTToken = JWT.sign(
				{ _id: userExists._id },
				process.env.SECRET_KEY
			);
			const userInfo = {
				id: userExists._id,
				email: userExists.email,
				fullName: userExists.fullName,
				profilePicture: userExists.profilePicture,
				username: userExists.username,
				location: userExists.location,
				dateOfBirth: userExists.dateOfBirth,
				joinedDate: userExists.createdAt,
			};

			return res
				.cookie("access_token", JWTToken, { httpOnly: true })
				.status(200)
				.json({
					success: true,
					result: { token: JWTToken, user: userInfo },
					message: "User logged in successfully!",
				});
		} else {
			return res.status(401).json({ error: "Invalid email or password." });
		}
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({
			error: "An error occurred during login. Please try again later.",
		});
	}
};

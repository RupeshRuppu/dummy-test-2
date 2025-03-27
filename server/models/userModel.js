// Importing Mongoose library for schema and model creation
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

// Defining the User schema
const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			default:
				"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=900&t=st=1696427985~exp=1696428585~hmac=d37daad92234b121053f11f491d2af2044c44a1a4b44401c815453747b60952b",
		},
		location: {
			type: String,
		},
		dateOfBirth: {
			type: Date,
		},
		followers: [
			{
				type: ObjectId,
				ref: "UserModel", // References the 'User' model for followers
			},
		],
		following: [
			{
				type: ObjectId,
				ref: "UserModel", // References the 'User' model for following
			},
		],
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt timestamps
	}
);

// Exporting User Model
module.exports = mongoose.model("UserModel", userSchema);

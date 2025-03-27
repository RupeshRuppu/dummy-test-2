// Importing Mongoose library for schema and model creation
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Defining the Tweet schema
const tweetSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			max: 250,
		},
		tweetedBy: {
			type: ObjectId,
			ref: "UserModel", // Reference to the User schema to associate the tweet with the user who posted it
			// required: true,
		},
		likes: [
			{
				type: ObjectId,
				ref: "UserModel", // Reference to the User schema to track users who liked the tweet
			},
		],
		dislikes: [
			{
				type: ObjectId,
				ref: "UserModel", // Reference to the User schema to track users who disliked the tweet
			},
		],
		retweetBy: [
			{
				type: ObjectId,
				ref: "UserModel", // Reference to the User schema to track users who retweeted the tweet
			},
		],
		image: {
			type: String,
			default: null, // Optional field, default is null, can store an image URL
		},
		replies: [
			{
				type: ObjectId,
				ref: "TweetModel", // Reference to the Tweet schema for replies, allowing nested tweets
			},
		],
		tweetType: {
			type: String,
			default: "post",
		},
		tcontent: [
			{
				type: String,
			},
		],
		tweetOpinion: [{ type: Number }],
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt timestamps
	}
);

// Create the Tweet model using the schema
// const TweetModel = mongoose.model('TweetModel', tweetSchema);
// module.exports = TweetModel;
module.exports = mongoose.model("TweetModel", tweetSchema); // Exporting Tweet Model

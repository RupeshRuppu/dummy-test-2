// Tweet-related controllers (create, like or dislike, reply, retweet etc)
// Importing necessary libraries and modules
const mongoose = require("mongoose");
const TweetModel = mongoose.model("TweetModel");

// Create a Tweet
exports.createTweet = async (req, res) => {
	try {
		// Extracting user data from the request body
		const { content, image, tweetType, tcontent = [] } = req.body;

		// Checking if required fields are missing
		if (!content) {
			return res.status(400).json({ error: "Content cannot be empty" });
		}

		const user = req.user;

		if (user) {
			user.password = undefined; // Removing the password from the user object for security
		} else {
			console.error("User data not available in the request.");
			return res
				.status(500)
				.json({ error: "An error occurred while creating the tweet!" });
		}

		// Creating a new tweet with the TweetModel
		const newTweet = new TweetModel({
			content: content ?? "t-content",
			image: image,
			tweetedBy: req.user._id,
			tweetType: tweetType ?? "post",
			tcontent,
		});

		// Saving the new tweet to the database
		await newTweet.save();
		res.status(201).json({ result: "Tweet Created Successfully!" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while saving the created tweet!" });
	}
};

// Like & Dislike Tweet
exports.likeAndDislike = async (req, res) => {
	const tweetId = req.params.id;

	try {
		// Fetching the tweet to check its existence
		const tweet = await TweetModel.findById(tweetId);

		// Checking if the tweet exists
		if (!tweet) {
			return res.status(404).json({ error: "Tweet not found" });
		}

		const userId = req.user._id;

		// Check if the user has already liked the tweet
		const hasLiked = tweet.likes.includes(userId);

		// Update the tweet based on the current state (like or dislike)
		const updateQuery = hasLiked
			? { $pull: { likes: userId }, $push: { dislikes: userId } }
			: { $pull: { dislikes: userId }, $push: { likes: userId } };

		// Updating the tweet
		const updatedTweet = await TweetModel.findByIdAndUpdate(
			tweetId,
			updateQuery,
			{ new: true }
		)
			.populate("tweetedBy", "_id fullName")
			.exec();

		// Respond with the updated tweet
		res.json(updatedTweet);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while updating the tweet" });
	}
};

// Like Tweet
// exports.like = async (req, res) => {
//   const tweetId = req.params.id;

//   try {
//     // Fetching the tweet to check its existence
//     const tweet = await TweetModel.findById(tweetId);

//     // Checking if the tweet exists
//     if (!tweet) {
//       return res.status(404).json({ error: "Tweet not found" });
//     }

//     // Checking if the user has already liked the tweet
//     if (tweet.likes.includes(req.user._id)) {
//       return res
//         .status(400)
//         .json({ error: "You have already liked this tweet" });
//     }

//     // Updating the tweet by adding the user's ID to the 'likes' array
//     const updatedTweet = await TweetModel.findByIdAndUpdate(
//       tweetId,
//       { $push: { likes: req.user._id } }, // Adding the user's ID to the 'likes' array
//       { new: true } // Returning the updated tweet
//     )
//       .populate("tweetedBy", "_id fullName") // Populating the 'tweetedBy' field with user details
//       .exec();

//     // Respond with the updated tweet
//     res.json(updatedTweet);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while liking the tweet" });
//   }
// };

// Dislike Tweet
// exports.dislike = async (req, res) => {
//   const tweetId = req.params.id; // Extracting the tweet ID from the request parameters

//   try {
//     // Fetching the tweet to check its existence
//     const tweet = await TweetModel.findById(tweetId);

//     // Checking if the tweet exists
//     if (!tweet) {
//       return res.status(404).json({ error: "Tweet not found" });
//     }

//     // Checking if the user has liked the tweet before allowing dislike
//     if (!tweet.likes.includes(req.user._id)) {
//       return res
//         .status(400)
//         .json({ error: "You can only dislike a tweet you've liked" });
//     }

//     // Updating the tweet by adding the user's ID to the 'dislikes' array
//     const updatedTweet = await TweetModel.findByIdAndUpdate(
//       tweetId,
//       { $pull: { likes: req.user._id }, $push: { dislikes: req.user._id } },
//       { new: true } // Returning the updated tweet
//     )
//       .populate("tweetedBy", "_id fullName") // Populating the 'tweetedBy' field with user details
//       .exec();

//     // Respond with the updated tweet
//     res.json(updatedTweet);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while disliking the tweet" });
//   }
// };

// Reply on a  Tweet
exports.reply = async (req, res) => {
	try {
		const { content, image } = req.body;
		const tweetId = req.params.id;
		const user = req.user;

		if (!content) {
			return res.status(400).json({ error: "Reply content cannot be empty" });
		}

		const existingTweet = await TweetModel.findById(tweetId);

		if (!existingTweet) {
			return res.status(404).json({ error: "Tweet not found" });
		}

		// Create a new tweet for the reply
		const newReply = new TweetModel({
			content,
			image,
			tweetedBy: req.params.id,
			inReplyTo: tweetId,
		});

		// Save the new reply to the database
		await newReply.save();

		// Update the original tweet to include the reply ID
		existingTweet.replies.push(newReply._id);
		await existingTweet.save();

		res
			.status(201)
			.json({ success: true, message: "Reply posted successfully" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while replying to the tweet" });
	}
};

// Get a single tweet detail
exports.tweetDetails = async (req, res) => {
	const tweetId = req.params.id;

	try {
		// Fetching a single tweet by ID
		const tweet = await TweetModel.findById(tweetId)
			.populate("tweetedBy", "_id fullName profilePicture") // Populate the 'tweetedBy' field with user details
			.exec();

		// Checking if the tweet exists
		if (!tweet) {
			return res.status(404).json({ error: "Tweet not found" });
		}

		// Respond with the details of the single tweet
		res.status(200).json(tweet);
	} catch (error) {
		console.error(error); // Log any errors that occur during tweet retrieval
		res.status(500).json({ error: "An error occurred while fetching tweets." }); // Return an error message for server-side errors
	}
};

// Get All Tweets Details
exports.getAllTweets = async (req, res) => {
	try {
		// Retrieve all tweets from the database and populate the 'tweetedBy' field with user details
		const dbTweets = await TweetModel.find()
			.populate("tweetedBy", "_id fullName profilePicture username email")
			.sort({ createdAt: -1 }); // Sorting by 'createdAt' in descending order
		res.status(200).json({ tweets: dbTweets }); // Return the retrieved tweets as a JSON response
	} catch (error) {
		console.error(error); // Log any errors that occur during tweet retrieval
		res.status(500).json({ error: "An error occurred while fetching tweets." }); // Return an error message for server-side errors
	}
};

// Delete a Tweet
exports.deleteTweet = async (req, res) => {
	const tweetId = req.params.id;
	try {
		// Finding the tweet by its ID and populate 'tweetedBy' to access author information
		const tweet = await TweetModel.findOne({ _id: tweetId }).populate(
			"tweetedBy",
			"_id"
		);

		// Checking if the tweet exists
		if (!tweet) {
			return res.status(400).json({ error: "Tweet does not exist" });
		}

		// Checking if the logged-in user is the author of the tweet before allowing deletion
		if (tweet.tweetedBy._id.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ error: "You don't have permission to delete this tweet" });
		}

		// Removing the tweet from the database
		await tweet.deleteOne();
		res.status(200).json({ message: "Tweet deleted successfully" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while deleting the tweet" });
	}
};

// Retweet a Tweet
exports.retweet = async (req, res) => {
	const tweetId = req.params.id; // Extracting the tweet ID from the request parameters

	try {
		// Check if the user has already retweeted this tweet
		const userRetweeted = await TweetModel.findOne({
			_id: tweetId,
			retweetBy: req.user._id,
		});

		if (userRetweeted) {
			return res
				.status(400)
				.json({ error: "You've already retweeted this tweet" });
		}

		// Updating the tweet by adding the user's ID to the 'retweetBy' array
		const updatedTweet = await TweetModel.findByIdAndUpdate(
			tweetId,
			{ $push: { retweetBy: req.user._id } }, // Adding the user's ID to the 'retweetBy' array
			{ new: true } // Returning the updated tweet
		)
			.populate("tweetedBy", "_id fullName") // Populating the 'tweetedBy' field with user details
			.exec();

		if (!updatedTweet) {
			return res.status(404).json({ error: "Tweet not found" });
		}

		// Respond with the updated tweet
		res.json(updatedTweet);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while retweeting the tweet" });
	}
};

exports.pollTweet = async (req, res) => {
	const tweetId = req.params.id;
	const index = req.body.id;

	console.log({ tweetId, index });

	try {
		const tweet = await TweetModel.findOne({
			_id: tweetId,
		});
		const length = tweet.tcontent.length;
		let newArray = [];

		if (!tweet.tweetOpinion || !tweet.tweetOpinion.length)
			newArray = new Array(length).fill(0);
		else newArray = tweet.tweetOpinion;

		newArray[index] += 1;

		tweet.tweetOpinion = newArray;
		await tweet.save();
		return res.status(200).json({ message: "updated" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while retweeting the tweet" });
	}
};

// Tweet-related routes (create, like or dislike, reply, retweet etc)
// Importing necessary libraries and modules
const express = require("express");
const tweetRouter = express.Router();
const tweetController = require("../controllers/tweetController");
const protectedRoute = require("../middleware/protectedResource");

// Create a Tweet
tweetRouter.post("/api/tweet", protectedRoute, tweetController.createTweet);
// Get All Tweets Details
tweetRouter.get("/api/tweets", protectedRoute, tweetController.getAllTweets);
// Get a single tweet detail
tweetRouter.get("/api/tweet/:id", protectedRoute, tweetController.tweetDetails);
// Delete a Tweet
tweetRouter.delete(
	"/api/tweet/:id",
	protectedRoute,
	tweetController.deleteTweet
);
// Like & Dislike Tweet
tweetRouter.put(
	"/api/tweet/:id/likeAndDislike",
	protectedRoute,
	tweetController.likeAndDislike
);
// Dislike Tweet
// tweetRouter.put('/api/tweet/:id/dislike', protectedRoute, tweetController.dislike);
// Reply on a  Tweet
tweetRouter.put("/api/tweet/:id/reply", protectedRoute, tweetController.reply);
// Retweet a Tweet
tweetRouter.post(
	"/api/tweet/:id/retweet",
	protectedRoute,
	tweetController.retweet
);
tweetRouter.post(
	"/api/tweet/:id/poll-tweet",
	protectedRoute,
	tweetController.pollTweet
);

// Exporting the Router
module.exports = tweetRouter;

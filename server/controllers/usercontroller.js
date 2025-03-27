// Importing necessary libraries and modules
const UserModel = require("../models/userModel");
const TweetModel = require("../models/tweetModel");

// Find User by ID
exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error during getUser:", error);
    res.status(500).json({
      error: "An error occurred during getUser. Please try again later.",
    });
  }
};

// Function to extract allowed fields from the request body
const filterUserFields = (body) => {
  const allowedFields = ["fullName", "dateOfBirth", "location"];
  const filteredData = {};

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      filteredData[field] = body[field];
    }
  }

  return filteredData;
};

// Update User details by ID
exports.updateUserDetails = async (req, res) => {
  try {
    // Check if the requested user is the logged-in user
    if (req.params.id !== req.user._id) {
      return res.status(403).json({
        error: "Unauthorized. You can only update your own user details.",
      });
    }

    // Extract only the allowed fields from the request body
    const updatedData = filterUserFields(req.body);

    // Update the user in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error while updating User:", error);
    res.status(500).json({
      error: "An error occurred during updating User. Please try again later.",
    });
  }
};

// TODO : Delete user details by ID - Not mentioned in documentation
exports.deleteUser = async (req, res) => {};

// Follow user
exports.followUser = async (req, res) => {
  try {
    // Fetch the user to follow
    const userToFollow = await UserModel.findById(req.params.id);

    // Fetch the current user
    const currentUser = await UserModel.findById(req.body.id);

    // Added a check to ensure a user cannot follow themselves.
    if (userToFollow._id.equals(currentUser._id)) {
      return res.status(403).json("You cannot follow yourself");
    }

    // Check if the current user is not already following the user
    if (!userToFollow.followers.includes(req.body.id)) {
      // Update the user to follow's followers array
      await userToFollow.updateOne({
        $push: { followers: req.body.id },
      });

      // Update the current user's following array
      await currentUser.updateOne({ $push: { following: req.params.id } });
    } else {
      return res.status(403).json("You already follow this user");
    }

    return res
      .status(200)
      .json({ success: true, message: "Followed User Successfully" });
  } catch (error) {
    console.error("Error while Following User:", error);
    res.status(500).json({
      error:
        "An error occurred during following the User. Please try again later.",
    });
  }
};

//Unfollow user
exports.unFollowUser = async (req, res) => {
  try {
    // Fetch the user to unfollow
    const userToUnfollow = await UserModel.findById(req.params.id);

    // Fetch the current user
    const currentUser = await UserModel.findById(req.body.id);

    // Added a check to ensure a user cannot unfollow themselves
    if (userToUnfollow._id.equals(currentUser._id)) {
      return res.status(403).json("You cannot unfollow yourself");
    }

    // Check if the current user is already following the user to unfollow
    if (currentUser.following.includes(req.params.id)) {
      // Update the user to unfollow's followers array
      await userToUnfollow.updateOne({
        $pull: { followers: req.body.id },
      });

      // Update the current user's following array
      await currentUser.updateOne({ $pull: { following: req.params.id } });
    } else {
      return res.status(403).json("You are not following this user");
    }

    return res
      .status(200)
      .json({ success: true, message: "Unfollowed User Successfully" });
  } catch (error) {
    console.error("Error while Unfollowing User:", error);
    res.status(500).json({
      error:
        "An error occurred during unfollowing the User. Please try again later.",
    });
  }
};

// Get User Tweets
exports.userAllTweets = async (req, res) => {
  try {
    // Fetching tweets for a specific user ID, sorted by creation date in descending order
    const userTweets = await TweetModel.find({ tweetedBy: req.params.id }).sort({
      createdAt: -1,
    });

    // Respond with the user's tweets
    res.status(200).json(userTweets);
  } catch (error) {
    console.error("Error while getting user's tweets:", error);
    res.status(500).json({
      error:
        "An error occurred during getting user's tweets. Please try again later.",
    });
  }
};

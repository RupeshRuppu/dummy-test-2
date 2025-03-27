// User-related routes (user details, Follow, unFollow, etc.)
// Importing necessary libraries and modules 
const express = require('express');
const userRouter = express.Router();
const protectedRoute = require('../middleware/protectedResource');
const userController = require('../controllers/userController');

// Find a user
userRouter.get('/api/user/:id', protectedRoute, userController.getUser)
// Update user details
userRouter.put('/api/user/:id', protectedRoute, userController.updateUserDetails) 
// Delete user details  // TODO: Delete user - Not mentioned in the documentation
// userRouter.delete('/api/user/:id', verifyToken, deleteUser)
// Follow user
userRouter.put('/api/user/:id/follow', protectedRoute, userController.followUser) 
// Unfollow user
userRouter.put('/api/user/:id/unfollow', protectedRoute, userController.unFollowUser) 
// User's All tweets
userRouter.get('/api/user/:id/tweets', protectedRoute, userController.userAllTweets) 

// Exporting the Router
module.exports = userRouter;
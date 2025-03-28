import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL, Authorization } from "../../config/config";

const Modal = ({ fetchTweets }) => {
	// State variables for managing tweets, new tweet content, and modal visibility
	const [tweets, setTweets] = useState([]);
	const [newTweetContent, setNewTweetContent] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	// Function to fetch tweets on component mount
	const fetchUpdatedTweets = async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/tweets`, Authorization);
			if (response.status === 200) {
				setTweets(response.data.tweets);
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Object representing the new tweet with its content
	const newTweet = { content: newTweetContent };

	// Function to add a new tweet
	const addNewTweet = async () => {
		try {
			// Use axios to post the new tweet
			const response = await axios.post(
				`${API_BASE_URL}/tweet`,
				newTweet,
				Authorization
			);
			if (response.status === 201) {
				// Fetch tweets after posting the new tweet
				fetchTweets();
				// Update the tweets state with the new tweet
				setTweets([response.data, ...tweets]);
			}
		} catch (error) {
			console.error(error);
		}
		// Reset new tweet content and close the modal
		setNewTweetContent("");
		setIsOpen(false);
	};

	return (
		<>
			{/* Tweet Button to open the modal */}
			<div>
				<button
					onClick={() => {
						setIsOpen(true);
					}}
				>
					Tweet
				</button>
			</div>

			{/* Modal Component */}
			<div
				className={`fixed inset-0 modal ${
					isOpen ? "block" : "hidden"
				} overflow-y-auto`}
			>
				<div className="flex items-center justify-center min-h-screen text-center sm:items-center sm:p-0">
					<div className="p-4 rounded-lg w-80 relative transform overflow-hidden text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						{/* Modal header */}
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<h1 className="mt-2 text-2xl font-bold">New Tweet</h1>
						</div>

						{/* Tweet Input Section */}
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<textarea
								className="w-full h-32 p-2 mb-4 border rounded"
								placeholder="What's happening?"
								value={newTweetContent}
								onChange={e => setNewTweetContent(e.target.value)}
							></textarea>
							{/* Icons for uploading images (placeholder) */}
							{/* <div className="flex items-center space-x-4 mb-4">
                <span>📷</span>
              </div> */}
						</div>

						{/* Buttons Section */}
						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							{/* Tweet Button */}
							<button
								type="button"
								className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
								onClick={addNewTweet}
							>
								Tweet
							</button>

							{/* Cancel Button */}
							<button
								type="button"
								className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
								onClick={() => {
									setIsOpen(false);
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;

import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL, Authorization } from "../../config/config";

const CreatePollModal = ({ fetchTweets }) => {
	const [polls, setPolls] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [question, setQuestion] = useState("");

	const addNewTweet = async () => {
		try {
			const response = await axios.post(
				`${API_BASE_URL}/tweet`,
				{ content: "t-content", tcontent: polls, tweetType: "poll" },
				Authorization
			);
			if (response.status === 201) {
				fetchTweets();
				setPolls([response.data, ...polls]);
			}
		} catch (error) {
			console.error(error);
		}
		setQuestion("");
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
					Create Poll
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
						<div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4 flex items-center justify-between">
							<div>
								<h1 className="mt-2 text-2xl font-bold">New Poll</h1>
								<p>Create a poll for user engagement</p>
							</div>
							<button
								onClick={() => {
									setPolls(prev => [...prev, question]);
									setQuestion("");
								}}
							>
								Add +
							</button>
						</div>

						<div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
							<input
								type="text"
								value={question}
								onChange={e => {
									setQuestion(e.target.value);
								}}
							/>
							<div className="p-4">
								{polls.map((poll, idx) => {
									return <p key={poll}>{`${idx + 1}. ${poll}?`}</p>;
								})}
							</div>
						</div>

						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								disabled={polls.length <= 1}
								type="button"
								className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto disabled:opacity-25"
								onClick={addNewTweet}
							>
								Poll Question
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

export default CreatePollModal;

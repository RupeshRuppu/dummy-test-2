import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/CreateTweet";
import TimelineTweet from "../Explore/TimelineTweet";
import CreatePollModal from "../Modal/CreatePoll";
import axios from "axios";
import { API_BASE_URL, Authorization } from "../../config/config";

const Home = () => {
	const [timelineTweets, setTimelineTweets] = useState([]);

	const fetchData = async () => {
		try {
			const response = await axios.get(`${API_BASE_URL}/tweets`, Authorization);
			setTimelineTweets(response.data.tweets);
		} catch (error) {
			console.error("Error fetching timeline tweets:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			{/* Header Section */}
			<div className="px-5 py-3 border-b border-lighter flex items-center justify-between">
				<h1 className="text-xl font-bold">Home</h1>
				{/* Button to open the create tweet modal */}
				<div className="flex gap-4">
					<button className="flex-none rounded-full bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
						<Modal fetchData={fetchData} />
					</button>
					<button className="flex-none rounded-full bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
						<CreatePollModal fetchData={fetchData} />
					</button>
				</div>
			</div>
			<TimelineTweet timelineTweets={timelineTweets} fetchData={fetchData} />
		</>
	);
};

export default Home;

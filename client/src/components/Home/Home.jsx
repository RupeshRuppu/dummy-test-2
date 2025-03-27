import React from "react";
import Modal from "../../components/Modal/CreateTweet";
import TimelineTweet from "../Explore/TimelineTweet";
import CreatePollModal from "../Modal/CreatePoll";

const Home = () => {
	const fetchTweets = () => {
		console.log("Fetching tweets...");
	};
	return (
		<>
			{/* Header Section */}
			<div className="px-5 py-3 border-b border-lighter flex items-center justify-between">
				<h1 className="text-xl font-bold">Home</h1>
				{/* Button to open the create tweet modal */}
				<div className="flex gap-4">
					<button className="flex-none rounded-full bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
						<Modal fetchTweets={fetchTweets} />
					</button>
					<button className="flex-none rounded-full bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
						<CreatePollModal fetchTweets={fetchTweets} />
					</button>
				</div>
			</div>
			<TimelineTweet />
		</>
	);
};

export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, Authorization } from "../../config/config";
import TweetCard from "./TweetCard";

const TimelineTweet = () => {
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
		<div className="mt-6">
			{timelineTweets.map(tweet => (
				<div key={tweet._id} className="p-2">
					<TweetCard
						tweet={tweet}
						setData={setTimelineTweets}
						fetchData={fetchData}
					/>
				</div>
			))}
		</div>
	);
};

export default TimelineTweet;

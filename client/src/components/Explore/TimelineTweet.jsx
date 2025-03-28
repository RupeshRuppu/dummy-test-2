import React from "react";
import TweetCard from "./TweetCard";

const TimelineTweet = ({ timelineTweets, fetchData }) => {
	return (
		<div className="mt-6">
			{timelineTweets.map(tweet => (
				<div key={tweet._id} className="p-2">
					<TweetCard tweet={tweet} fetchData={fetchData} />
				</div>
			))}
		</div>
	);
};

export default TimelineTweet;

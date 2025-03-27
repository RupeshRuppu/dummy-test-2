import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, Authorization } from "../../config/config";
import TweetCard from "./TweetCard";

const TimelineTweet = () => {
  // State for storing timeline tweets
  const [timelineTweets, setTimelineTweets] = useState([]);

  // Function to fetch timeline tweets from the API
  const fetchData = async () => {
    try {
      // console.log(Authorization);
      const response = await axios.get(`${API_BASE_URL}/tweets`, Authorization);
      setTimelineTweets(response.data.tweets);
    } catch (error) {
      console.error("Error fetching timeline tweets:", error);
    }
  };

  // Fetch timeline tweets on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-6">
      {/* Displaying timeline tweets using TweetCard component */}
      {timelineTweets.map((tweet) => (
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

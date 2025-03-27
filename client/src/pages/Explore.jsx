import React from "react";
import TimelineTweet from "../components/Explore/TimelineTweet";
import Modal from "../components/Modal/CreateTweet";

const Explore = () => {
  const fetchTweets = () => {
    console.log("Fetching tweets...");
  };
  return (
    <div>
      {/* Header Section */}
      <div className="px-5 py-3 border-b border-lighter flex items-center justify-between">
        <h1 className="text-xl font-bold">Explore</h1>
        {/* Button to open the create tweet modal */}
        <button className="flex-none rounded-full bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
        <Modal fetchTweets={fetchTweets} />
        </button>
      </div>
      <TimelineTweet />
    </div>
  );
};

export default Explore;

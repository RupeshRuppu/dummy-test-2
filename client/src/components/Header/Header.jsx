import React from "react";

// Header component with a tweet button
const Header = ({ handleTweetButtonClick }) => {
	return (
		<div className="px-5 py-3 border-b border-lighter flex items-center justify-between">
			<h1 className="text-xl font-bold">Home</h1>
			<button
				type="button"
				onClick={handleTweetButtonClick}
				className="flex-none rounded-full bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
			>
				Poll
			</button>
			<button
				type="button"
				onClick={handleTweetButtonClick}
				className="flex-none rounded-full bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
			>
				Tweet
			</button>
		</div>
	);
};

export default Header;

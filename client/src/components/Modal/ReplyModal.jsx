import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL, Authorization } from "../../config/config";
import toast from "react-hot-toast";

const ReplyModal = ({ tweet, fetchReplies, isOpen, onClose }) => {
  // State for managing reply content and modal visibility
  const [replyContent, setReplyContent] = useState("");

  // Function to add a new reply to the tweet
  const addNewReply = async () => {
    try {
      const newReply = { content: replyContent };
      const replyTweet = await axios.put(
        `${API_BASE_URL}/tweet/${tweet._id}/reply`,
        {},
        Authorization
      );
      console.log(replyTweet);

      if (replyTweet.status === 200) {
        fetchReplies();
        toast.success("Reply posted successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while posting your reply.");
      console.error("error", error);
    }

    setReplyContent("");
    onClose();
  };

  return (
    <>
      {/* Reply Modal Component */}
      <div
        className={`fixed inset-0 modal ${
          isOpen ? "block" : "hidden"
        } overflow-y-auto`}
      >
        <div className="flex items-center justify-center min-h-screen text-center sm:items-center sm:p-0">
          <div className="p-4 rounded-lg w-80 relative transform overflow-hidden text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            {/* Modal header */}
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h1 className="mt-2 text-2xl font-bold">New Reply</h1>
            </div>

            {/* Reply Input Section */}
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <textarea
                className="w-full h-32 p-2 mb-4 border rounded"
                placeholder="What's your reply?"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              ></textarea>
              {/* Icons for uploading images (placeholder) */}
              <div className="flex items-center space-x-4 mb-4">
                <span>📷</span>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {/* Reply Button */}
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={addNewReply}
              >
                Reply
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
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

export default ReplyModal;

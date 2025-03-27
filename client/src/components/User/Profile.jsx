import React, { useEffect, useState } from "react";
import axios from "axios";
import format from "date-fns/format";
import EditProfile from "./EditProfile";
import { API_BASE_URL, Authorization } from "../../config/config";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import {
  changeProfile,
  setFollowersCount,
  setFollowingCount,
} from "../../redux/userSlice";

const Profile = () => {
  // Redux state to get the current user details
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // State to manage the profile picture, user being viewed, and edit profile modal visibility
  const [profilePic, setProfilePic] = useState(
    "https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
  );
  const [userBeingViewed, setUserBeingViewed] = useState(null);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);

  // Get the user id from the route parameters
  const { id } = useParams();

  // Fetch the user being viewed when the component mounts or the user id changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/user/${id}`,
          Authorization
        );
        const user = response.data;
        setUserBeingViewed(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to fetch user. Please try again.");
      }
    };

    // Check if the user id is present, then fetch the user
    if (id) {
      fetchUser();
    }

    // Fetch followers count
    dispatch(setFollowersCount());

    // Fetch following count
    dispatch(setFollowingCount());
  }, [id]);

  // Open the file input dialog when clicking on the "Upload Profile Photo" button
  const handleUploadClick = () => {
    document.getElementById("profilePicInput").click();
  };

  // Handle the change event when a new file is selected for profile picture upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    // If a file is selected, create a form data and upload the profile image
    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const uploadProfileImage = await axios.post(
          `${API_BASE_URL}/user/${currentUser.id}/uploadProfileImage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: "Bearer " + localStorage.getItem("JWTToken"),
            },
          }
        );

        const newFileName = uploadProfileImage.data.fileName;
        const newProfilePictureURL = `${API_BASE_URL}/user/${currentUser.id}/downloadProfileImage/${newFileName}`;

        // Dispatch Redux action to update profile picture
        dispatch(changeProfile(newProfilePictureURL));

        // Set the new profile picture URL and show success toast
        setProfilePic(newProfilePictureURL);

        if (uploadProfileImage.status === 200) {
          toast.success("Profile picture updated successfully");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        toast.error("Failed to update profile picture. Please try again.");
      }
    }
  };

  // Handle profile update
  const handleUpdateProfile = (updatedData) => {
    setUserBeingViewed((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  // Format date to a readable format
  const formatDate = (date) => {
    try {
      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        return ""; // Return an empty string or some default value for invalid dates
      }
      return format(parsedDate, "MMMM d, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  console.log(currentUser);

  return (
    <div>
      {/* Banner Image */}
      <div
        className="w-full bg-cover bg-no-repeat bg-center"
        style={{
          height: "200px",
          backgroundImage:
            "url(https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200)",
        }}
      ></div>

      {/* Main Content */}
      <div className="p-4">
        {/* Profile Header */}
        <div className="relative flex w-full">
          <div className="flex flex-1">
            <div style={{ marginTop: "-6rem" }}>
              <div
                style={{ height: "9rem", width: "9rem" }}
                className="md rounded-full relative avatar"
              >
                {/* Profile Picture */}
                <img
                  style={{ height: "9rem", width: "9rem" }}
                  className="md rounded-full relative border-4 border-gray-900"
                  src={currentUser.profilePicture}
                  alt=""
                />
                <div className="absolute"></div>
              </div>
            </div>
          </div>

          {/* Edit Profile and Upload Buttons */}
          <div className="flex flex-col text-right space-y-4">
            <input
              type="file"
              id="profilePicInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {/* Upload Profile Photo Button */}
            <button
              className="flex-none rounded-full bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={handleUploadClick}
            >
              Upload Profile Photo
            </button>
            {/* Edit Profile Button */}
            <button
              className="flex-none rounded-full bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={() => setEditProfileOpen(true)}
            >
              Edit Profile
            </button>

            {/* Conditionally render the Follow button */}
            {!currentUser && (
              <button className="flex-none rounded-full bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-darkblue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Follow
              </button>
            )}

            {/* Render EditProfile as a modal */}
            {isEditProfileOpen && (
              <EditProfile
                isOpen={isEditProfileOpen}
                onClose={() => setEditProfileOpen(false)} // Close modal
                onUpdateProfile={handleUpdateProfile}
              />
            )}
          </div>
        </div>

        {/* User Information Section */}
        <div className="space-y-4 justify-center w-full mt-3 ml-3">
          {/* User Name and Username */}
          <div>
            <h2 className="text-xl leading-6 font-bold text-black">
              {currentUser.fullName}
            </h2>
            <p className="text-sm leading-5 font-medium text-gray-600 pb-4">
              {currentUser.email}
            </p>
          </div>

          {/* User Bio */}
          {/* <div className="mt-3">
            <p className="text-gray-500 leading-tight mb-2">
              Software Engineer / Designer / Entrepreneur <br />
              Visit my website to test a working <b>Twitter Clone.</b>
            </p>
          </div> */}

          {/* Additional User Details */}
          <div className="flex flex-wrap mt-3">
            {/* Location */}
            <div className="flex items-center mr-4">
              <CiLocationOn />
              <p className="text-gray-500 ms-2">{currentUser.location}</p>
            </div>

            {/* Join Date */}
            <div className="flex items-center mr-4">
              <CiCalendarDate />
              <p className="text-gray-500 ms-2">
                {formatDate(currentUser.joinedDate)}
              </p>
            </div>

            {/* DateOfBirth */}
            <div className="flex items-center">
              <LiaBirthdayCakeSolid />
              <p className="text-gray-500 ms-2">
                {formatDate(currentUser.dateOfBirth)}
              </p>
            </div>
          </div>
        </div>

        {/* User Stats Section */}
        <div className="flex mt-5">
          {/* Following Count */}
          <div className="mr-6">
            <p className="font-bold text-gray-700">
              {currentUser.followingCount}
            </p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>

          {/* Followers Count */}
          <div className="mr-6">
            <p className="font-bold text-gray-700">
              {currentUser.followersCount}
            </p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>

          {/* Likes Count */}
          {/* <div className="mr-6">
            <p className="font-bold text-gray-700">584</p>
            <p className="text-gray-500 text-sm">Likes</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;

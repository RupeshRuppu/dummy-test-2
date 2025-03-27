import React, { useState } from "react";
import { Link } from "react-router-dom";

// Importing individual icons for use
import { FaPlusCircle, FaHashtag, FaUser } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";

// Redux hooks for state management
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

const NavBar = () => {
  // State for handling user profile dropdown visibility
  const [dropdown, setDropdown] = useState(false);

  // Get current user from Redux store
  const user = useSelector((state) => state.user.currentUser);
  const currentUser = Object.keys(user).length === 0 ? false : true;
  // console.log(currentUser);

  // Dispatch function for handling user logout
  const dispatch = useDispatch();

  // Function to handle user logout
  const handleLogout = () => {
    dispatch(logout());
    // Clear user-related data from local storage
    localStorage.removeItem("JWTToken");
    localStorage.removeItem("user");
  };

  return (
    <>
      {/* Navigation */}
      <div>
        {/* Twitter Logo */}
        <img
          src="/logo512.png"
          alt="TweetNest Logo"
          width={"40px"}
          className="ml-0 sm:ml-8 h-10 w-10 md:my-4"
        />

        {/* Navigation Tabs */}
        <Link to="/">
          {/* Home Tab */}
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <IoIosHome className="text-2xl mr-2 text-left" />
            <p className="text-lg font-semibold text-left hidden lg:block">
              Home
            </p>
          </div>
        </Link>
        <Link to="/explore">
          {/* Explore Tab */}
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <FaHashtag className="text-2xl mr-2 text-left" />
            <p className="text-lg font-semibold text-left hidden lg:block">
              Explore
            </p>
          </div>
        </Link>
        <Link to={`/profile/${user.id}`}>
          {/* Profile Tab */}
          <div className="flex items-center space-x-6 px-2 py-4 hover:bg-slate-200 rounded-full cursor-pointer">
            <FaUser className="text-2xl mr-2 text-left" />
            <p className="text-lg font-semibold text-left hidden lg:block">
              Profile
            </p>
          </div>
        </Link>

        {/* Tweet Button */}
        {/* <button className="text-white bg-red-500 rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-4 hover:bg-darkblue mt-4">
          <p className="hidden lg:block">Tweet</p>
          <i className="lg:hidden">
            <FaPlusCircle />
          </i>
        </button> */}
      </div>

      {/* User Profile Dropdown */}
      <div className="lg:w-full relative">
        <button
          onClick={() => setDropdown(true)}
          className="flex items-center w-full rounded-full p-2 focus:outline-none"
        >
          {/* User Profile Image */}
          <img
            src={currentUser && user.profilePicture}
            className="w-10 h-10 rounded-full border border-lighter"
            alt="Profile"
          />

          <div className="hidden lg:block ml-4">
            {/* Displaying full name and email from currentUser */}
            <p className="text-sm font-extrabold leading-tight text-left">{currentUser && user.fullName}</p>
            <p className="text-xs leading-tight">
              @{currentUser && user.email}
            </p>
          </div>
          <i className="hidden lg:block fas fa-angle-down ml-auto text-lg"></i>
        </button>
        {/* Dropdown Content */}
        {dropdown && (
          <div className="absolute bottom-0 left-0 w-52 rounded-lg shadow-md border-lightest bg-white mb-16">
            {/* Logout Button */}
            <button
              className="w-full text-left hover:bg-lightest  border-lighter p-3 test-sm focus:outline-none"
              onClick={handleLogout}
            >
              Log out {currentUser && user.fullName}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;

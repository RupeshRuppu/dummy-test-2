import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../components/User/Profile";
import Navbar from "./LeftNavbar/Navbar";
import Error from "../pages/Error";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import EditProfile from "./User/EditProfile";
import Explore from "../pages/Explore";

const AppRouter = () => {
  // Using Redux useSelector to get the current user ID
  const currentUser = useSelector((state) => state.user.currentUser);

  // Layout component to determine the structure based on user authentication
  const Layout = () => {
    return (
      <>
        {!currentUser ? (
          // Display Login page if no current user
          <Login />
        ) : (
          // Display main layout for authenticated users
          <div className="flex container h-screen w-full">
            {/* Left Navbar */}
            <div className="lg:w-1/5 border-r border-lighter px-2 md:px-4 lg:px-6 py-2 flex flex-col justify-between">
              <Navbar />
            </div>

            {/* Main Content Area */}
            <div className="w-full md:w-1/2 h-full overflow-y-scroll">
              {/* Outlet for rendering nested routes */}
              <Outlet />
              {/* Toaster for displaying notifications */}
              <Toaster position="top-right" />
            </div>

            {/* Right Sidebar (hidden on smaller screens) */}
            <div className="md:block hidden w-1/12 h-full border-l border-lighter py-2 px-6 overflow-y-scroll relative">
              {/* <h1>Right</h1> */}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/edit" element={<EditProfile />} />

        {/* Main Layout for Authenticated Users */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

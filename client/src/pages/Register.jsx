//Importing libraries and modules
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import SweetAlert from "sweetalert2";
import { API_BASE_URL } from "../config/config";
import RegisterBanner from "../assets/images/bannerregistration.jpeg";
import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";

const Register = () => {
  // Defining and initializing state variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password matching
  const [loading, setLoading] = useState(false); // State for loading icon during API calls

  const dispatch = useDispatch(); // Access the dispatch function from a Redux store
  const navigate = useNavigate(); // Access the navigation function from a routing library

  // Function to handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginStart());

    // Checking if the passwords match before making the API request
    if (password === confirmPassword) {
      setPasswordsMatch(true);

      // Creating a request data object
      const requestData = {
        fullName,
        email,
        username,
        password,
        confirmPassword,
      };

      try {
        // Making a POST request to the registration API
        const response = await axios.post(
          `${API_BASE_URL}/auth/register`,
          requestData
        );

        if (response.data.success) {
          setLoading(false);
          SweetAlert.fire({
            icon: "success",
            title: "User Registered Successfully",
          });
          // Resetting (Clearing) the input fields
          setFullName("");
          setEmail("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          dispatch(loginSuccess(response.data.result));
          navigate("/auth/login");
        }
      } catch (error) {
        setLoading(false);
        dispatch(loginFailed());

        if (error.response) {
          const errorMessage = error.response.data.error;
          SweetAlert.fire({
            icon: "error",
            title: "Registration Failed",
            text: errorMessage,
          });
          console.error("Registration failed:", error);
        } else {
          SweetAlert.fire({
            icon: "error",
            title: "Registration Failed",
            text: "An error occurred during user registration.",
          });
          console.error(
            "Error during registration on the frontend API call",
            error
          );
        }
      }
    } else {
      setPasswordsMatch(false);
      setLoading(false);
    }
  };

  // Returning the registration form JSX
  return (
    <div className="flex justify-center items-center h-screen">
      {/*  Left: Image  */}
      <div className="w-1/2 h-screen hidden lg:block relative">
        <img
          src={RegisterBanner}
          alt="Register-banner"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right: Register Form  */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        {/* Display the Register header */}

        {/* <img
          src={TweetNestLogo}
          alt="TweetNest Logo"
          className="w-11 h-11"
        /> */}

        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>

        <form onSubmit={(e) => handleRegister(e)}>
          {/* Full Name  */}
          <div className="mb-3">
            <label htmlFor="fullName" className="block text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              id="fullName"
              name="fullName"
              placeholder="Enter your name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          {/* Last Name  */}
          {/* <div className="mb-3">
            <label htmlFor="lastname" className="block text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              id="lastname"
              name="lastname"
              placeholder="Enter your last name"
              required
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div> */}
          {/* Email address */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email address
            </label>
            <input
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="on"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="on"
              type="text"
              id="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="on"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            {/* Confirm Password Input Field */}
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Display an error message if passwords do not match (only when passwordsMatch is false) */}
          {!passwordsMatch && (
            <p className="text-danger">Passwords do not match</p>
          )}

          {/* Remember Me Checkbox  */}
          {/* <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div> */}
          {/* // Forgot Password Link  */}
          {/* <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div> */}

          {/* Register Button */}
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md w-full lg:text-base tracking-wide transition duration-500 px-4 py-3"
            onClick={handleRegister}
          >
            <svg
              aria-hidden="true"
              role="status"
              className={`inline w-4 h-4 me-3 text-white ${
                loading ? "animate-spin" : ""
              }`}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Register
            {/* For Loading Icon  */}
            {/* {loading ? <span role="status" aria-hidden="true"></span> : ""} */}
          </button>
        </form>
        {/* Sign up  Link  */}
        <div className="mt-6 text-blue-500 text-center my-3">
          Already a member ?
          <Link to="/auth/login" className="ps-2 hover:underline">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

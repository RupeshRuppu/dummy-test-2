// API base URL
export const API_BASE_URL = "http://localhost:4000/api";

// Authorization headers for Axios requests
export const Authorization = {
  headers: {
    "Content-type": "application/json",
    authorization: "Bearer " + localStorage.getItem("JWTToken"),
  },
};

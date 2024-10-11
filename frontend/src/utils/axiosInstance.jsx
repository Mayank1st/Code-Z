import axios from "axios";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: "https://ludo-u8tx.onrender.com/api",
  withCredentials: true,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

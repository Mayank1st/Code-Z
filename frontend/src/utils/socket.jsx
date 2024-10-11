// src/utils/socket.js
import { io } from "socket.io-client";

// Create a single socket instance
const socket = io("http://localhost:8000");

export default socket;
    
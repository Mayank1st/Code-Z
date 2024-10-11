import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectdb.js";
import passport from "passport";
import userRoutes from "./routes/userRoutes.js";
import "./config/passport-jwt-strategy.js";
import http from "http"; 
import { Server } from "socket.io"; 
import handleCollaboratorSocketConnection from "./sockets/CollaboratorSocket.js";


const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_HOST,
    credentials: true,
  },
});

// Apply your ludoGameSockets logic
handleCollaboratorSocketConnection(io); 

// This will solve CORS Policy Error
const corsOptions = {
  origin: process.env.FRONTEND_HOST,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

// Passport Middleware
app.use(passport.initialize());

// Cookie Parser
app.use(cookieParser());

// Load Routes
app.use("/api/user", userRoutes);

// Start the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

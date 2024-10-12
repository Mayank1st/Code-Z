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
import "./config/google-strategy.js";
import setTokensCookies from "./utils/setTokensCookies.js";

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

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/user.birthday.read",
      "https://www.googleapis.com/auth/plus.profile.emails.read",
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/plus.me",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_HOST}/login`,
  }),
  (req, res) => {
    // Access user object from req.user
    const {
      user,
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp,
      googleAuthData,
    } = req.user;

    // Set tokens in cookies
    setTokensCookies(
      res,
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp
    );

    // Redirect with googleAuthData as query parameters
    const redirectUrl = `${process.env.FRONTEND_HOST}/?data=${encodeURIComponent(JSON.stringify(googleAuthData))}`;

    res.redirect(redirectUrl);
  }
);


// Start the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

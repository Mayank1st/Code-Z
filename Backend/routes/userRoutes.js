import express from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";
import passport from "passport";
import setAuthHeader from "../middlewares/setAuthHeader.js";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";
import gameplayController from "../controllers/gameplayController.js";
import AiController from "../controllers/AiController.js";
import codeRoomController from "../controllers/codeRoomController.js";

// Initialize the AI Controller with the API key
const aiController = new AiController();

// Public Routes
router.post("/register", UserController.userRegistration);
router.post("/verify-email", UserController.verifyEmail);
router.post("/login", UserController.userLogin);
router.post("/refresh-token", UserController.getNewAccessToken);
router.post("/reset-password-link", UserController.sendUserPasswordResetEmail);
router.post("/reset-password/:id/:token", UserController.userPasswordReset);

// Gameplay public routes
router.post("/create-room", gameplayController.createRoom);

// AI public route
router.post(
  "/generate-content",
  aiController.generateContent.bind(aiController)
);

// Protected Routes
router.get(
  "/me",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.userProfile
);
router.post(
  "/change-password",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.changeUserPassword
);
router.post(
  "/logout",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UserController.userLogout
);

// Coding Room Protected routes
router.post(
  "/room/create",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  codeRoomController.createRoom
);

// Route to invite participants to a room
router.post(
  "/room/:roomId/invite",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }), 
  codeRoomController.inviteParticipants 
);

export default router;

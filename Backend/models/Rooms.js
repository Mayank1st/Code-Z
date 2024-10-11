import mongoose from "mongoose";

// Define the Gameplay Room schema
const gameplayRoomSchema = new mongoose.Schema({
  room_id: {
    type: String,
    required: true,
    unique: true, // Ensure room_id is unique
  },
  creator_name: {
    type: String, // Change to String to store the name directly
    required: true,
  },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "user",
    required: true,
  },
  participants: [
    {
      participant_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: "user",
      },
      participant_email: {
        type: String,
        required: true,
      },
    },
  ],
  message: {
    type: String,
    required: false, // Optional message from the user
    trim: true,
  },
  invite_token: {
    type: String,
    required: true, // Unique invite token for the room
  },
  invite_token_expiry: {
    type: Date,
    required: true, // Expiry time for the invite token
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically set the current date/time
  },
});

// Model
const GameplayRoomModel = mongoose.model("gameplayRoom", gameplayRoomSchema);

export default GameplayRoomModel;

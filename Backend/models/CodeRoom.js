import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'; // To generate random room IDs

// Define the schema for a code room
const codeRoomSchema = new mongoose.Schema({
  room_id: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4 // Automatically generate a random unique room_id
  },

  creator_email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Email stored in lowercase for consistency
  },

  invitees: {
    type: [String], // Array of email addresses for invitees
    default: [], // Default to an empty array
    validate: {
      validator: function (invitees) {
        return invitees.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)); // Validate email format
      },
      message: 'Invalid email format in invitees list'
    }
  },

  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  }
});

// Create the model
const CodeRoom = mongoose.model("CodeRoom", codeRoomSchema);

export default CodeRoom;

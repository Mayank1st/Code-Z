import { v4 as uuidv4 } from "uuid"; // For generating unique tokens
import transporter from "../config/emailConfig.js"; // Gmail transporter
import GameplayRoomModel from "../models/Rooms.js";
import UserModel from "../models/User.js";

class GameplayController {
  static createRoom = async (req, res) => {
    const { room_id, creator_name, creator_id, participant_email, message } =
      req.body;

    // Validate input fields
    if (!room_id || !creator_id || !creator_name || !participant_email) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }

    try {
      // Check if the participant exists
      const participant = await UserModel.findOne({ email: participant_email });
      if (!participant) {
        return res.status(404).json({
          status: "failed",
          message: "Participant not found!",
        });
      }

      // Check for an existing room for the same participant and expire it if found
      const existingRoom = await GameplayRoomModel.findOne({
        "participants.participant_email": participant_email,
      });
      if (existingRoom) {
        // Expire the old invite by setting invite_token_expiry to the past
        existingRoom.invite_token_expiry = new Date(Date.now() - 1000); // Expire immediately
        await existingRoom.save(); // Save the updated room
        await GameplayRoomModel.deleteOne({ _id: existingRoom._id }); // Delete the old room
      }

      // Generate a unique invite token and set expiry time
      const inviteToken = uuidv4(); // Unique invite token
      const tokenExpiry = Date.now() + 15 * 60 * 1000; // Token expiry set to 15 minutes from now

      // Create a new room with the provided information
      const newRoom = new GameplayRoomModel({
        room_id,
        creator_name,
        creator_id,
        participants: [
          {
            participant_id: participant._id,
            participant_email: participant.email,
          },
        ],
        invite_token: inviteToken,
        invite_token_expiry: new Date(tokenExpiry), // Store as Date object
      });

      // Save the room in the database
      await newRoom.save();

      // Invite Link (inviteToken will be used to join the room)
      // const inviteLink = `${process.env.FRONTEND_HOST}/game/join/${inviteToken}`;
      const inviteLink = `${process.env.FRONTEND_HOST}/participent-pet-name/${room_id}`;

      console.log("Invite link:", inviteLink);

      // Build the email message
      const userMessage = message
        ? `<p>Message from ${creator_name}: ${message}</p>`
        : "";
      const emailBody = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ludo Game Invite</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
            font-size: 24px;
            text-align: center;
        }
        p {
            color: #666666;
            font-size: 16px;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>You're Invited!</h1>
        <p>Hello <span style="font-weight: bold;">${participant.name}</span>,</p>
        <p>You have been invited to join a Ludo game room by <span style="font-weight: bold;">${creator_name}</span>.</p>
        ${userMessage}
        <p>Please <a class="button" href="${inviteLink}">click here</a> to join the game.</p>
        <div class="footer">
            <p>Happy Gaming!</p>
            <p>The Ludo Team</p>
        </div>
    </div>
</body>
</html>
`;

      // Send invite email to the participant
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: participant.email,
        subject: "Ludo Game Room Invite",
        html: emailBody,
      });

      // Send success response
      res.status(200).json({
        status: "success",
        message: "Room created and invite sent successfully",
        inviteLink,
        room_id,
      });
    } catch (error) {
      console.error("Error creating room:", error);
      res.status(500).json({
        status: "failed",
        message: "Error creating room",
      });
    }
  };

  // Get lobby details
  // static lobbyDetails = async (req, res) => {
  //   try {
  //     const room = await GameplayRoomModel.findOne({ room_id });

  //     if (!room) {
  //       return res.status(404).json({
  //         status: "failed",
  //         message: "Room not found. Please create a new room.",
  //       });
  //     }

  //     const lobbyData = {
  //       room_id: room.room_id,
  //       creator_name: room.creator_name,
  //       creator_id: room.creator_id,
  //       participants: room.participants.map((p) => ({
  //         participant_id: p.participant_id,
  //         participant_email: p.participant_email,
  //       })),
  //     };

  //     res.status(200).json({
  //       status: "success",
  //       message: "Lobby Details",
  //       data: lobbyData,
  //     });
  //   } catch (error) {
  //     console.error("Error fetching lobby data:", error);
  //     res.status(500).json({
  //       status: "failed",
  //       message: "Error fetching lobby data",
  //     });
  //   }
  // };
}

export default GameplayController;

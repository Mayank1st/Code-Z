import nodemailer from "nodemailer";
import CodeRoom from "../models/CodeRoom.js";
import UserModel from "../models/User.js";

class codeRoomController {
  // Method to create a room
  static createRoom = async (req, res) => {
    try {
      const userEmail = req.user.email; // Get the user's email from the request

      // Check for an existing room for the user and remove it if found
      const existingRoom = await CodeRoom.findOne({ creator_email: userEmail });

      if (existingRoom) {
        // If an existing room is found, remove it
        await CodeRoom.deleteOne({ room_id: existingRoom.room_id });
      }

      // Generate a new room ID
      const roomId = Math.random().toString(36).substring(2, 15); // Example random room ID
      const newRoom = new CodeRoom({
        room_id: roomId,
        creator_email: userEmail,
        invitees: [],
        createdAt: new Date(), // Set createdAt to current date
      });

      await newRoom.save();
      return res
        .status(201)
        .json({ message: "Room created successfully", room: newRoom });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };

  // Method to invite participants to a room and send emails
  static inviteParticipants = async (req, res) => {
    try {
      const { roomId } = req.params;
      const { invitees } = req.body;

      // Check if roomId exists
      if (!roomId) {
        return res.status(400).json({ message: "Room ID not provided" });
      }

      // Fetch the room by roomId
      const room = await CodeRoom.findOne({ room_id: roomId });

      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }

      // Add new invitees (if any) to the room
      if (invitees && Array.isArray(invitees)) {
        room.invitees = [...new Set([...room.invitees, ...invitees])];
      }

      // Save updated room details
      await room.save();

      // Send invitation emails with URLs to the invitees
      await codeRoomController.sendInvitationEmails(invitees, room.room_id);

      return res.status(200).json({
        message: "Participants invited and emails sent successfully",
        room,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  };

  // Function to send emails to invitees with dynamic URLs using NodeMailer
  static sendInvitationEmails = async (invitees, roomId) => {
    // Set up Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Loop through the invitees and send an email to each
    for (const invitee of invitees) {
      const inviteUrl = `http://localhost:3000/join-code-editor-room?roomId=${roomId}&participentEmail=${invitee}`;

      const mailOptions = {
        from: process.env.GMAIL_USER, // Sender email
        to: invitee, // Recipient email
        subject: "You are invited to join a code room",
        text: `Hello, you have been invited to join a code room. Use the following link to join: ${inviteUrl}`,
        html: `
          <p>Hello,</p>
          <p>You have been invited to join a code room.</p>
          <p><strong>Click the link to join:</strong></p>
          <a href="${inviteUrl}">${inviteUrl}</a>
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
    }
  };
}

export default codeRoomController;

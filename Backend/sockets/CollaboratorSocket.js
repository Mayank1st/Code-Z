const handleCollaboratorSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("creator_connection", (msg) => {
      console.log("Creator connected:", msg);
    });

    socket.on("participent_connection", (msg) => {
      console.log("Participant connected:", msg);
    });

    // Adding creator and participant to the room
    socket.on("join-room", ({ roomId, userEmail }) => {
      socket.join(roomId);
      const message = `User ${userEmail} has joined the room: ${roomId}`;

      // Notify everyone in the room
      io.to(roomId).emit("roomNotificationMessages", message);
      console.log(message);
    });

    // Leave the room
    socket.on("leave-room", ({ roomId, userEmail }) => {
      socket.leave(roomId);
      const message = `User ${userEmail} has left the room: ${roomId}`;

      // Notify everyone in the room
      io.to(roomId).emit("roomNotificationMessages", message);
      console.log(message);
    });

    // Example for saving and broadcasting code (commented for now)
    socket.on("saveCode", ({ roomId, code, userEmail }) => {
      console.log(code);
      // Emit the new code to all connected clients except the sender
      socket.to(roomId).emit("codeSaved", { code, userEmail });
    });

    // Example for handling user messages (commented for now)
    socket.on("userConnected", (message) => {
      console.log(message);
      socket.broadcast.emit("userMessage", message); // Broadcast to other clients
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      // Optionally, you can notify the room about disconnection
      // io.to(roomId).emit("roomNotificationMessages", `User with socket id ${socket.id} disconnected`);
    });
  });
};

export default handleCollaboratorSocketConnection;

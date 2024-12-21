const users = {};

const socketController = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on('register', (userId) => {
      console.log("my id", userId);
      users[userId] = socket.id;
      console.log(users);
    });

    // Broadcast the message
    socket.on("chat message", ({ message, senderid, receiverid }) => {
      const receiverSocketId = users[receiverid];
      console.log(receiverSocketId);
      if (receiverSocketId) {
        socket.to(receiverSocketId).emit("chat message", {
          message: message,
          senderid: senderid,
          receiverid: receiverid
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = socketController;

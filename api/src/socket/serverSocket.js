module.exports = (serverSocket) => {
  const { Server } = require("socket.io");
  const io = new Server(serverSocket, { cors: { origin: "*" } });

  // Almacenar clientes que se vayan conectando
  let onLineUsers = [];

  const addNewUser = (username, socketId) => {
    !onLineUsers.some((user) => user.username === username) &&
      onLineUsers.push({ username, socketId });
  };

  const removeUser = (socketId) => {
    onLineUsers = onLineUsers.filter((user) => user.socketId !== socketId);
  };

  io.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on("newUser", (username) => {
      addNewUser(username, socket.id);
      console.log("Usuarios en línea: ", onLineUsers);
    });

    socket.on("sendMessage", () => {
      io.emit("message");
    });

    socket.on("updateMessage", () => {
      io.emit("messageUpdated");
    });

    socket.on("disconnect", () => {
      removeUser(socket.id)
      console.log(`Usuario desconectado: ${socket.id}`);
    });
  });
};

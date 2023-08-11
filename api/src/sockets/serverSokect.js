module.exports = serverSocket => {
  const { Server } = require('socket.io');
  const io = new Server(serverSocket, {cors:{origin:'*'}});


  // Almacenar clientes que se vayan conectando
  let onLineUsers = [];

  const addNewUser = (username, socketId) => {
    !onLineUsers.some((user) => user.username === username) &&
      onLineUsers.push({ username, socketId });
  };

  const removeUser = (socketId) => {
    onLineUsers = onLineUsers.filter((user) => user.socketId !== socketId);
  };

  const getUser = (username) => {
    return onLineUsers.find((user) => user.username === username);
  };

  // --------- Escuchando cuando se conecte un cliente ----------------
  io.on("connection", (socket) => {
    //console.log('Cliente conectado: ', socket.id);

    socket.on("newUser", (username) => {
      addNewUser(username, socket.id);
      // console.log("onLineUsers: ", onLineUsers);
    });

    // =============== Chat Individual v2 ================================
    socket.on("private-message",
    ({
      flag, data, userNameReceptor, userNameEmisor
    }) => {

      // console.log("LISTMESSAGES: ", data?.messages, "FLAG: ", flag);

      const receiver = getUser(userNameReceptor);
      const sender = getUser(userNameEmisor);
      // console.log("receiver: ", receiver, "sender: ", sender)
      io.to(receiver?.socketId).emit("mensaje-recibido", data);
      io.to(sender?.socketId).emit("mensaje-recibido", data);

    });

    socket.on("disconnect", () => {
      removeUser(socket.id)
    })
  });
};

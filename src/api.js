import openSocket from "socket.io-client";

function connectToSocket(username, cb) {
  const socket = openSocket("http://localhost:5000", {
    query: `username=${username}`
  });
  socket.on("updateChat", chat => cb(null, chat));
  // socket.emit("connect", username);
}

export { connectToSocket };

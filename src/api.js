import openSocket from "socket.io-client";
let socket;

function connectToSocket(username, cb) {
  socket = openSocket("http://localhost:5000", {
    query: `username=${username}`
  });
  socket.on("updateChat", chat => cb(null, chat));
}

function disconnect() {
  socket.disconnect();
}

export { connectToSocket, disconnect };

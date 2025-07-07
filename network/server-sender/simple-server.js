const net = require("net");

// Here we start the server. The callback with the socket(stream of data).
const server = net.createServer((socket) => {
  // An Event is listening every time data comes through the stream
  socket.on("data", (data) => {
    console.log(data.toString("utf-8"));
  });
});

server.listen(3099, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});

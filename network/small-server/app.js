const http = require("http");

const port = 4080;
const hostName = "127.0.0.1"; // Loopback address, localhost.

const server = http.createServer((req, res) => {
  const data = { message: "Hi there!" };

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Connection", "close");
  res.statusCode = 200;
  res.end(JSON.stringify(data));
});

server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});

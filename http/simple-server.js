const http = require("node:http");

const server = http.createServer((req, res) => {});

// Request is the message we are getting from our client (readable stream)
// Response is what we are sending back to the client
server.on("request", (request, response) => {
  console.log("========== METHOD: ==========");
  console.log(request.method);
  console.log("========== URL: ==========");
  console.log(request.url);
  console.log("========== HEADERS: ==========");
  console.log(request.headers);

  request.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));
  });
});

server.listen(8050, "::1", () => {
  console.log(`Server listening on http://localhost:8050`);
});

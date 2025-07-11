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

  console.log("========== BODY: ==========");

  const name = request.headers.name;

  let data = "";
  request.on("data", (chunk) => {
    data += chunk.toString();
  });

  request.on("end", () => {
    data = JSON.parse(data);

    console.log(data);
    console.log(name);

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        message: `Hey ${name}, your post with title: ${data.title}, was created`,
      })
    );
  });
});

server.listen(8050, "::1", () => {
  console.log(`Server listening on http://localhost:8050`);
});

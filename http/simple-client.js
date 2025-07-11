const http = require("node:http");

// this is one instance of our client, this is a TCP connection
const agent = new http.Agent({ keepAlive: true });

const request = http.request({
  agent: agent,
  hostname: "localhost",
  port: 8050,
  method: "POST",
  path: "/create-post",
  headers: {
    "Content-Type": "application/json",
    name: "Ricardo",
    // "content-length": Buffer.byteLength(
    //   JSON.stringify({ message: "Are you still there?" }, "utf-8")
    // ),
  },
});

// This event is emitted only once
request.on("response", (response) => {
  console.log("========== STATUS: ==========");
  console.log(response.statusCode);
  console.log("========== HEADERS: ==========");
  console.log(response.headers);
  console.log("========== BODY: ==========");
  response.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));
  });
  response.on("end", () => {
    console.log("No more data in response.");
  });
});

request.end(
  JSON.stringify({
    title: "Title to my Post",
    body: "This is some text, and more, and more, and more.",
  })
);

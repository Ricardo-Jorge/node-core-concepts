const net = require("net");

// Here we start the server. The callback with the socket(stream of data).
const server = net.createServer((socket) => {
  // An Event is listening every time data comes through the stream
  socket.on("data", (data) => {
    console.log(data.toString("utf-8"));
  });

  const response = Buffer.from(
    "485454502f312e3120323030204f4b0d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a446174653a205765642c203136204a756c20323032352031343a33393a333720474d540d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a4b6565702d416c6976653a2074696d656f75743d350d0a5472616e736665722d456e636f64696e673a206368756e6b65640d0a0d0a34650d0a7b226d657373616765223a22486579205269636172646f2c20796f757220706f73742077697468207469746c653a205469746c6520746f206d7920506f73742c207761732063726561746564227d0d0a300d0a0d0a",
    "hex"
  );

  socket.write(response);
});

server.listen(3099, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});

const { Worker, workerData, parentPort } = require("worker_threads");

// const port2 = workerData;

// port2.postMessage({ name: "Joe" });

// port2.on("message", (msg) => {
//   console.log(`Message received on Port2: `, msg);
// });

/* SImplified Message Channel */

const port2 = parentPort;

port2.on("message", (msg) => {
  console.log("Message received on new thread: ", msg);
});

port2.postMessage("Message from new thread!");

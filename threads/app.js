const { Worker, MessageChannel, workerData } = require("worker_threads");

/* Example 1:
const obj = { name: "Ricardo" };

new Worker("./calc.js", { workerData: obj });

console.log("Obj in main thread:", obj);
*/

// const channel = new MessageChannel();

// const port1 = channel.port1;
// const port2 = channel.port2;

// new Worker("./calc.js", { workerData: port2, transferList: [port2] });

// port1.postMessage({ name: "Ricardo" });

// port1.on("message", (msg) => {
//   console.log(`Message received on Port1: `, msg);
// });

/* SImplified Message Channel */

const thread1 = new Worker("./calc.js");

thread1.on("message", (msg) => {
  console.log("Main thread received this message: ", msg);
});

thread1.postMessage({ name: "Ricardo" });

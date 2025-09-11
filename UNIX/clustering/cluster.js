const cluster = require("node:cluster");

if (cluster.isMaster) {
  let requestCount = 0;
  setInterval(() => {
    console.log(`Total number of requests: ${requestCount}`);
  }, 5000);
  console.log(`This is the parent with PID ${process.pid}`);
  cluster.schedulingPolicy = cluster.SCHED_RR;

  const coresCount = require("node:os").cpus().length;
  for (let i = 0; i < coresCount; i++) {
    const worker = cluster.fork();
    worker.send("Some message.");
    console.log(
      `The parent process spawned a new child process with PID ${worker.process.pid}`
    );
  }

  cluster.on("message", (worker, message) => {
    if (message.action && message.action === "request") {
      requestCount++;
    }
  });

  cluster.on("fork", (worker) => {});

  cluster.on("listening", (worker, address) => {});

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.id}  ${signal || code} died. Restarting...`
    );
    cluster.fork();
  });
} else {
  require("./server.js");
}

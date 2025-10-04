const { Worker, isMainThread, threadId } = require("worker_threads");

if (isMainThread === true) {
  const worker = new Worker("./isMainThread.js");
  console.log("This is main thread with id:", threadId);
} else {
  console.log("This is worker thread with id:", threadId);
}

const { Worker, isMainThread, threadId } = require("worker_threads");

if (isMainThread === true) {
  const worker = new Worker("./isMainThread.js");
} else {
  console.log("This is  worker thread with id: ", threadId);
}

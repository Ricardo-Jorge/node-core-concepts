const { Worker } = require("worker_threads");
const { performance } = require("perf_hooks");

// count = 100_000_000, THREADS = 2, time 1.451s, calc-crypto
// count = 100_000_000, THREADS = 4, time 1.347s, calc-crypto

// count = 10_000_000_000, THREADS = 2, time 205s, calc-crypto-batch
// count = 10_000_000_000, THREADS = 4, time 182s, calc-crypto-batch

const THREADS = 4;
let completed = 0;
let sum = 0;
const count = 10_000_000_000;
const workerFileName = "./calc-crypto-batch.js";

console.log(`Running with ${workerFileName}...`);

for (let i = 0; i < THREADS; i++) {
  const start = performance.now();

  const worker = new Worker(workerFileName, {
    workerData: { count: count / THREADS },
  });

  const threadId = worker.threadId;
  console.log(`Worker ${threadId} started`);

  worker.on("message", (number) => {
    sum += number;
  });

  worker.on("error", (err) => {
    console.error(err);
  });

  worker.on("exit", (code) => {
    console.log(`Worker ${threadId} exited.`);

    completed++;

    if (completed === THREADS) {
      console.log(`Time taken: ${performance.now() - start}ms`);
      console.log(`Sum: ${sum}`);
    }

    if (code !== 0) {
      console.error(new Error(`Worker exited with code ${code}`));
    }
  });
}

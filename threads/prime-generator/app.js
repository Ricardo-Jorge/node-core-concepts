const { performance } = require("perf_hooks");
const { Worker } = require("worker_threads");

// Numbers
// THREADS: 1, Count: 200, Start: 100_000_000_000_000, Time: 9.080s
// THREADS: 2, Count: 200, Start: 100_000_000_000_000, Time: 5.535s
// THREADS: 4, Count: 200, Start: 100_000_000_000_000, Time: 3.996s

//BigInts
// THREADS: 1, Count: 200, Start: 100_000_000_000_000n, Time: 15.477s
// THREADS: 2, Count: 200, Start: 100_000_000_000_000n, Time: 9.720s
// THREADS: 4, Count: 200, Start: 100_000_000_000_000n, Time: 7.259s

let result = [];
let completed = 0;
const THREADS = 4;
const count = 200;

const start = performance.now();

for (let i = 0; i < THREADS; i++) {
  const worker = new Worker("./calc.js", {
    workerData: {
      count: count / THREADS,
      start: 100_000_000_000_000n + BigInt(i * 300),
    },
  });

  const threadId = worker.threadId;
  console.log(`Worker ${threadId} started.`);

  worker.on("message", (primes) => {
    result = result.concat(primes);
  });

  worker.on("error", (err) => {
    console.error(err);
  });

  worker.on("exit", (code) => {
    console.log(`Worker ${threadId} exited.`);

    completed++;
    if (completed === THREADS) {
      console.log(`Time Taken: ${performance.now() - start}ms`);
      console.log(result.sort());
    }

    if (code !== 0) {
      console.error(`Worker ${threadId} exited with code ${code}`);
    }
  });
}

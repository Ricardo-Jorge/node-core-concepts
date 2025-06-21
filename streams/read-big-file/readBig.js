const fs = require("fs/promises");

(async () => {
  console.time("readBig");
  const fileHandleRead = await fs.open("src.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamWrite = fileHandleWrite.createWriteStream();

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });

  let split = " ";
  streamRead.on("data", (chunck) => {
    const numbers = chunck.toString("utf-8").split("  ");

    if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
      // If we have something in the split variable, we concatenate it with the first item of the next "chunck"
      if (split) {
        numbers[0] = split.trim() + numbers[0].trim();
      }
    }
    // Verify if the number before the last plus one is different thant the last number. If they are different, it means that the previous split a number incorrectly.
    //  So we save them in the split variable and then "pop" them from the array
    if (
      Number(numbers[numbers.length - 2]) + 1 !==
      Number(numbers[numbers.length - 1])
    ) {
      split = numbers.pop();
    }

    numbers.forEach((number) => {
      let n = Number(number);
      if (n % 2 === 0) {
        // If the writable stream is false(it means the stream is full), we pause the stream read process to avoid memory usage overload
        if (!streamWrite.write(" " + n + " ")) {
          streamRead.pause();
        }
      }
    });
  });

  // Here we add an event listener to check if the stream is empty, then we are safe to resume our stream read process
  streamWrite.on("drain", () => {
    streamRead.resume();
  });

  streamRead.on("end", () => {
    console.log("Done reading stream!");
    console.timeEnd("readBig");
  });
})();

const { pipeline } = require("stream");
const fs = require("fs/promises");
const { error } = require("console");

// (async () => {
//   const destFile = await fs.open("text-copy.txt", "w");
//   const result = await fs.readFile("src.txt");

//   await destFile.write(result);
// })();

// (async () => {
//   console.time("copy");
//   const srcFile = await fs.open("src.txt", "r");
//   const destFile = await fs.open("text-copy.txt", "w");

//   let bytesRead = -1;

//   while (bytesRead !== 0) {
//     const readResults = await srcFile.read();
//     bytesRead = readResults.bytesRead;

//     if (bytesRead !== 16384) {
//       const indexOfNotFilled = readResults.buffer.indexOf(0);
//       console.log(indexOfNotFilled);
//       const newBuffer = Buffer.alloc(indexOfNotFilled);
//       readResults.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
//       destFile.write(newBuffer);
//     } else {
//       destFile.write(readResults.buffer);
//     }
//   }

//   console.timeEnd("copy");
// })();

(async () => {
  console.time("copy");
  const srcFile = await fs.open("src.txt", "r");
  const destFile = await fs.open("text-copy.txt", "w");

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  //   console.log(readStream.readableFlowing);

  //   readStream.pipe(writeStream);
  //   console.log(readStream.readableFlowing);

  //   readStream.on("end", () => {
  //   });
  pipeline(readStream, writeStream, (error) => {
    console.log(error);
    console.timeEnd("copy");
  });
})();

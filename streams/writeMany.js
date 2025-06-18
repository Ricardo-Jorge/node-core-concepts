// const fs = require("fs/promises");

// (async () => {
//   console.time("writeMany");
//   const fileHandle = await fs.open("text.txt", "w");

//   for (let i = 0; i < 1000000; i++) {
//     await fileHandle.write(` ${i} `);
//   }
//   console.timeEnd("writeMany");
//   fileHandle.close();
// })();

const fs = require("fs");

(async () => {
  console.time("writeMany");
  fs.open("test.txt", "w", (err, fd) => {
    for (let i = 0; i < 1000000; i++) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      fs.writeSync(fd, buff);
    }
    console.timeEnd("writeMany");
  });
})();

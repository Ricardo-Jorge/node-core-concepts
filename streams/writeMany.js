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

// Callback function, Faster than promises
// const fs = require("fs");

// (async () => {
//   console.time("writeMany");
//   fs.open("test.txt", "w", (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       const buff = Buffer.from(` ${i} `, "utf-8");
//       fs.writeSync(fd, buff);
//     }
//     console.timeEnd("writeMany");
//   });
// })();

// const fs = require("fs/promises");

// Not good way to work with streams
// Faster than callback but high memory usage (Before memory optmization)
// (async () => {
//   console.time("writeMany");
//   const fileHandle = await fs.open("text.txt", "w");

//   const stream = fileHandle.createWriteStream();

//   for (let i = 0; i < 1000000; i++) {
//     const buff = Buffer.from(` ${i} `, "utf-8");
//     stream.write(buff);
//   }
//   console.timeEnd("writeMany");
//   fileHandle.close();
// })();

const fs = require("fs/promises");

(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("text.txt", "w");

  const stream = fileHandle.createWriteStream();
  // console.log(stream.writableHighWaterMark);
  // const buff = Buffer.alloc(16383, 10);
  // console.log(stream.write(buff)); // Retorna True porque ainda resta espaço no stream para ser preenchido
  // console.log(stream.write(Buffer.alloc(1, "a"))); // Retorna falso porque ocupou o ultimo espaço restante do stram

  // // adiciona uma função de escuta ao streame ao passar o parametro "drain", emite um evento que anuncia que o espaço interno do stream está novamente disponivel
  // stream.on("drain", () => {
  //   console.log(stream.write(Buffer.alloc(1, "a")));
  //   console.log("We are ready to write again!");
  //   console.log(stream.writableLength);
  // });
  let i = 0;

  const writeMany = () => {
    while (i < 1000000) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      i++;

      // This is the last write, so we close the fileHandle and print the process time on the console
      if (i === 999999) {
        return stream.end(buff);
      }

      // Breake out of the loop if the stream is filled
      if (!stream.write(buff)) {
        break;
      }
    }
  };

  writeMany();

  // resume our loop if the stream's buffer is empty
  stream.on("drain", () => {
    console.log("Drained!!!");
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("writeMany");
    fileHandle.close();
  });
})();

const { Writable } = require("stream");
const fs = require("node:fs");

class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunksSize = 0;
    this.writesCount = 0;
  }

  // This will run after the constructor, and it will put off all calling the other methods
  // until we call the callback function
  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        // if we call the callback with an argument, it means that we have an error, and should no proceed
        callback(err);
      } else {
        this.fd = fd;
        // No arguments means it was successful
        callback();
      }
    });
  }

  // The underscope before the name of the function is to not override the parent method
  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunksSize += this.chunks.length;

    if (this.chunksSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err);
        }
        this.chunks = [];
        this.chunksSize = 0;
        ++this.writesCount;
        callback();
      });
    } else {
      // when we´re done, we should call the callback function
      callback();
    }
    // do our write operation...
  }

  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);

      this.chunks = [];
      callback();
    });
  }

  _destroy(error, callback) {
    console.log("Number of writes:", this.writesCount);
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(error || err);
      });
    } else {
      callback(error);
    }
  }
}

(async () => {
  console.time("writeMany");
  const stream = new FileWriteStream({
    fileName: "text.txt",
  });
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

  const numbersOfWrite = 1000000;

  const writeMany = () => {
    while (i < numbersOfWrite) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      i++;

      // This is the last write, so we close the fileHandle and print the process time on the console
      if (i === numbersOfWrite - 1) {
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
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("writeMany");
  });
})();

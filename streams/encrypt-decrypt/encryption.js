const { Transform } = require("stream");
const fs = require("fs/promises");

class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    console.log(chunk);
    for (let i = 0; i < chunk.length; ++i) {
      if (chunk[i] !== 255) chunk[i] += 1;
    }

    callback(null, chunk);
  }
}

(async () => {
  const readFileHandle = await fs.open("text.txt", "r");
  const writeFileHandle = await fs.open("write.txt", "w");

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  const encrypt = new Encrypt();

  readStream.pipe(encrypt).pipe(writeStream);
})();

const { Transform } = require("stream");
const fs = require("fs/promises");

class Decrypt extends Transform {
  constructor(fileSize) {
    super();
    this.fileSize = fileSize;
    this.totalBytesRead = 0;
  }
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; ++i) {
      if (chunk[i] !== 255) {
        chunk[i] -= 1;
      }
      ++this.totalBytesRead;
      if (this.totalBytesRead % 1000 === 0) {
        let percentage = (this.totalBytesRead / this.fileSize.fileSize) * 100;
        console.log("Decrypting... " + percentage.toFixed(2) + " %");
      }
    }

    callback(null, chunk);
  }
}

(async () => {
  const readFileHandle = await fs.open("write.txt", "r");
  const writeFileHandle = await fs.open("decrypted-file.txt", "w");

  const readFileSize = (await readFileHandle.stat()).size;

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  const decrypt = new Decrypt({ fileSize: readFileSize });

  readStream.pipe(decrypt).pipe(writeStream);

  readStream.on("end", () => {
    console.log("Decrypting completed!");
  });
})();

const zlib = require("zlib");
const fs = require("fs");

const src = fs.createReadStream("./test.txt");
const dest = fs.createWriteStream("./text-gigantic-compressed.txt");

src.pipe(zlib.createGzip()).pipe(dest);

/*
Other forms of compression: Brotli, Deflate (Have their own ways of compression)
** you cannot use Gzip to compress and Brotli do Decompress

zlib.createBrotliCompress()
zlib.createBrotliDecompress()

zlib.createDeflate()
zlib.createInflate()

*/

const { Buffer } = require("buffer");

const buff = Buffer.alloc(1e6); // 1,000,000 bytes

// Alocar memoria dentro de um intervalo de 5 segundos
setInterval(() => {
  //   for (let i = 0; i < buff.length; i++) {
  //     buff[i] = 0x22;
  //   }

  b.fill(0x22);
}, 5000);

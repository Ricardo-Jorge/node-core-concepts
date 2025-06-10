const { buffer } = require("buffer");

const memoryContainer = Buffer.alloc(4); // 4 bytes (32 bits)

memoryContainer[0] = 0xa1;
memoryContainer[1] = 0xb2;
memoryContainer.writeInt8(-32, 2); // <Método correto de se escrever um número negativo.
memoryContainer[3] = 0xd4;

console.log(memoryContainer[0]);
console.log(memoryContainer[1]);
console.log(memoryContainer.readInt8(2));
console.log(memoryContainer[3]);

console.log(memoryContainer.toString("hex"));

// Forma alternativa de alocar um buffer
const buff = Buffer.from([0x48, 0x69, 0x21]);
console.log(buff.toString("utf-8"));

const stringBuff = Buffer.from("486921", "hex");
console.log(stringBuff.toString("utf-8"));

const buff2 = Buffer.from("HI!", "utf-8");
console.log(buff2);

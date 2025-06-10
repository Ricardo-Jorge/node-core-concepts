const { Buffer } = require("buffer");

const buff = Buffer.alloc(10000, 0); // Método padrão de alocar memoria. Como padrão, é alocado um zero (segundo argumento) para cada espaço.

console.log(Buffer.poolSize >>> 1); // esse operador move todos valores de bite para direita (forma de dividir pelo computador)

//Método mais rápido sem automaticamente atribuir valores a esse pedaço de memoria. obs: pedaço de memoria pode já ter dados alocados e consequentemente serem perdidos.
const unsafeBuff = Buffer.allocUnsafe(10000);
for (let i = 0; i < unsafeBuff.length; i++) {
  if (unsafeBuff[i] !== 0) {
    console.log(
      `Element at position ${i} has value: ${unsafeBuff[i].toString(2)}`
    );
  }
}

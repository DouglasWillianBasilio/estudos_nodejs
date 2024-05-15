const fs = require("fs")

console.log("incio");

fs.writeFileSync('arquivo.txt', 'oi')

console.log('fim');
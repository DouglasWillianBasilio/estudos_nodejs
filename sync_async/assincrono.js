const fs = require("fs")

console.log("incio");

fs.writeFile("assinc.txt", 'oi', function(err) {
    setTimeout(function() {
        console.log('arquivo criado');
    }, 1000)
})

console.log('fim');
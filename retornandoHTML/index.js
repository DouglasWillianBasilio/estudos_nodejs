const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Contenty-Type', 'text/html')
    res.end('<h1>Oi apenas testando o server com HTML </h1> <p>Testando o P </p>')
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta : ${port}`);
})
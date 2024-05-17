import express from 'express';
import path from 'path';

const app = express()
const port = 3000

const basePath = path.join(__dirname, 'templates')

app.get('/', (req, res) => {

    res.send('Ta funcion?')

})

app.listen(port, () => {

    console.log(`esta funcionando na porta ${port}`)

})

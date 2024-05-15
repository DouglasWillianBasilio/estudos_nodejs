const x = 10

// checar se x é um numero

if(!Number.isInteger(x)) {
    throw new Error("O valor de X não é um número inteiro!")
}

console.log("Continuando o codigo...")
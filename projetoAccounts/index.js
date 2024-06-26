// modulos externos
import inquirer from 'inquirer';
import chalk from 'chalk';

//modulos internos
import fs from 'fs';
import { parse } from 'path';

console.log("iniciamos o account");

operation()

function operation () {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'oque você deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ],
    }]).then((answer) => {

        const action = answer['action']
        if(action === 'Criar conta'){
            createAccount()
        } else if(action === 'Depositar') {
            deposit()
        } else if(action === 'Consultar saldo') {
            getAccountBalance()
        } else if(action === 'Sacar') {
            withDraw()
        } else if(action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
            process.exit()
        }
    }).catch((err) => console.log(err))
}

// criando uma conta

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco'));
    console.log(chalk.green('Defina as opções da sua conta a seguir'));

    buildAccount()
    return
}

function buildAccount() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para sua conta: '
        }
    ]).then(answer => {
        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'),
        )
        buildAccount()
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err) {
            console.log(err)
        })

        console.log(chalk.green('Parabéns sua conta foi criada!'))
        operation()
    })
    .catch((err) => console.log(err))

}

// adicionar depoisto na conta do usuário

function deposit() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        // verificando se a conta existe
        if(!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar: '
            }
        ]).then((answer) => {
            
            const amount = answer['amount']

            // adicionando valor
            addAmount(accountName, amount)
            operation()

        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

}

function checkAccount(accountName) {
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }
    return true
}

function addAmount(accountName, amount) {

    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))
    console.log(chalk.bgGreen.black(`Seu novo saldo é de ${accountData.balance}R$`))
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })
    return JSON.parse(accountJSON)
}

// mostrando saldo na conta
function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta: '
        }
    ]).then((answer) => {
        const accountName = answer["accountName"]
         
        // verificando se a conta existe

        if(!checkAccount(accountName)){
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(
            `Olá ${accountName}, o saldo da sua conta é de: ${accountData.balance}R$`
        ))
        operation()

    })
    .catch(err => console.log(err))
}

// sacando da conta

function withDraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual a conta que deseja sacar: '
        }
    ]).then((answer) => {
        const accountName = answer["accountName"]

        if(!checkAccount(accountName)) {
            return withDraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja sacar?'
            }
        ]).then((answer => {
            const amount = answer['amount']
            removeAmount(accountName, amount)
        }))
        .catch(err => console.log(err))


})
.catch(err => console.log(err))
}

function removeAmount(accountName, amount) {

    const accountData = getAccount(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'),
    )
    return withDraw()
    }

    if(accountData.balance < amount) {
        console.log(chalk.bgRed.black('Você não tem o valor suficiente!'),
    )
    return withDraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err)
        },
    )

    console.log(chalk.green(`Saque de ${amount}R$ realizado da sua conta!`))
    console.log(chalk.bgGreen.black(`Seu novo saldo é de ${accountData.balance}R$`))
    operation()
}
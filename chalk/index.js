const chalk = require("chalk")

const nota = 9

if (nota>=7) {
    console.log(chalk.green("voce foi aprovado"));
}else {
    console.log(chalk.bgRed("reprovou"));
}
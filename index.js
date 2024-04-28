const inquirer = require('inquirer')
const chalk = require('chalk')

const fs = require('fs')

operation()

function operation() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'o que deseja fazer ?',
                choices: [
                    'criar conta',
                    'consultar saldo',
                    'depositar',
                    'sacar',
                    'sair',
                ],
            },
        ])
        .then((answer) => {
            const action = answer['action']

            if (action === 'criar conta') {
                createAccount
            }
        })
        .catch((err) => console.log(err))
}

// create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabens por escolher o Accounts'))
    console.log(chalk.greenBright('Defina as opçoes da sua conta a seguir'))
    buildAccount()
}

function buildAccount() {
    inquirer
        .prompt([{
            name: 'accountName',
            message: 'Digite um nome para sua Conta:',
        },
        ])
        .then((answer) => {
            const accountName = answer['accountName']
            console.info(accountName)

            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts')
            }

            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(chalk.bgRed.black('Esta conta Já existe, informa outro nome!')
                )
                buildAccount()
                return
            }
            fs.writeFileSync(
                `accounts/${accountName}.json`,
                '{"balance": 0}',
                function (err) {
                    console.log(err)
                },
            )
            console.log(chalk.green('Parabéns, a sua conta foi criada !'))
            operation()
        })
        .catch((err) => console.log(err))
}















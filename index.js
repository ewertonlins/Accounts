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
                createAccount()
            } else if (action === 'depositar') {
                deposit()

            } else if (action === 'consultar saldo') {

            } else if (action === 'sacar') {

            } else if (action === 'sair') {
                console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
                process.exit()
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
// add an amount to user account

function deposit() {
    inquirer
        .prompt([{
            name: 'accountName',
            message: 'Qual o nome da sua Conta ?',
        },
        ])
        .then((answer) => {
            const accountName = answer['accountName']
            //verify if account exists
            if (!checkAccount(accountName)) {
                return deposit()
            }

            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Quanto voce deseja depositar ?',
                }
            ]).then((answer) => {
                const amount = answer['amount']
                // add an amount
                addAmount(accountName, amount)
                operation()


            }).catch(err => console.log(err))
        })
//        .catch(err => console.log(err))

}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }
    return true
}

function addAmount(accountName, amount) {
    const account = getAccount(accountName)  

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        },
    )
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`)
    )
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        enconding: 'utf8',
        flag: 'r'
    })
    return JSON.parse(accountJSON)
}








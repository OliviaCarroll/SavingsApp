
// Current Balance
const currentBalanceElement = document.querySelector("#current-balance p")
// Total Income Display
const totalIncomeDisplay = document.querySelector("#income > p")
// Total Outgoing Display
const totalOutgoingDisplay = document.querySelector("#outgoings > p")
// Transaction List
const transactionList = document.getElementById("transaction-list")
// Form Fields
const conceptField = document.getElementById("add-concept")
const amountField = document.getElementById("add-amount")
// Buttons
const addTransactionButton = document.getElementById("add-transaction-button")
const clearFormButton = document.getElementById("clear-form-button")


let transactionRecords = [];

// add transaction
addTransactionButton.addEventListener("click", () => {

    const concept = conceptField.value
    const amount = amountField.value

    let newTransaction = {
        concept,
        amount
    }

    let transactionType = amount > 0 ? "income" : "outgoing"

    let conceptDiv = `<div><p>${concept}</p></div>`
    let amountDiv = `<div><p>${amount}</p></div>`

    let transactionDivString = 
        `<li class="${transactionType} transaction">${conceptDiv}${amountDiv} <button id="delete-transaction" onclick="removeTransaction(${
            newTransaction.concept})">X</button></li>`

    let newListElement = document.createElement("li")

    newListElement.innerHTML = transactionDivString

    transactionList.appendChild(newListElement)

    transactionRecords.push(newTransaction)

    const { overallBalance, totalIncome, totalOutgoing } = processTransactions()

    currentBalanceElement.innerHTML = `${overallBalance}€`
    totalIncomeDisplay.innerHTML = `${totalIncome}€`
    totalOutgoingDisplay.innerHTML = `${totalOutgoing}€`

    clearForm()
    
})

/* function generateRandomID() {
    return Math.floor(Math.random() * 100000)
}
 */
function removeTransaction(concept){
    transactionRecords.forEach((transaction, i) => {
        if(transaction.concept == concept){
            transactionRecords.splice(i, 1)
    }
})
}
/* 
function removeTransaction(id) {
    transactionRecords = transactionRecords.filter((transaction) => transaction.id !== id)
    processTransactions()
    currentBalanceElement.innerHTML = `${overallBalance}€`
    totalIncomeDisplay.innerHTML = `${totalIncome}€`
    totalOutgoingDisplay.innerHTML = `${totalOutgoing}€`
}
 */
clearFormButton.addEventListener("click", () => {
    clearForm()
})

function processTransactions(){
    let overallBalance = 0.00
    let totalIncome = 0.00
    let totalOutgoing = 0.00

    transactionRecords.forEach(transaction => {
        let amount = parseFloat(transaction.amount)
        overallBalance += amount

        if(transaction.amount > 0){
            totalIncome += amount
            return
        }

        totalOutgoing += (amount * -1)
    })

    return {
        overallBalance : overallBalance.toFixed(2),
        totalIncome : totalIncome.toFixed(2),
        totalOutgoing : totalOutgoing.toFixed(2)
    }
}

function clearForm(){
    conceptField.value = ""
    amountField.value = ""
}
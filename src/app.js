
// Current Balance
let currentBalanceElement = document.querySelector("#current-balance p")
// Total Income Display
let totalIncomeDisplay = document.querySelector("#income > p")
// Total Outgoing Display
let totalOutgoingDisplay = document.querySelector("#outgoings > p")
// Transaction List
let transactionList = document.getElementById("transaction-list")
// Form Fields
const conceptField = document.getElementById("add-concept")
const amountField = document.getElementById("add-amount")
// Buttons
const addTransactionButton = document.getElementById("add-transaction-button")
const clearFormButton = document.getElementById("clear-form-button")

const localStorageTransactions = JSON.parse(localStorage.getItem("transactionRecord"))

let transactionRecord = localStorage.getItem("transactionRecord") !== null ? localStorageTransactions : [];

// let transactions = document.getElementsByClassName("remove-transaction")
// add transaction
addTransactionButton.addEventListener("click", () => {

    const concept = conceptField.value
    const amount = amountField.value

    const newTransaction = {
        id: transactionRecord.length,
        concept,
        amount
    };
    
    transactionRecord.push(newTransaction)
    console.log(transactionRecord)
    updateDOM(newTransaction)
    let processedTransactions = processTransactions(transactionRecord)
    console.log(processedTransactions)
    updateTotals(processedTransactions)
    clearForm()
    return transactionRecord
})

clearFormButton.addEventListener("click", () => {
    clearForm()
})

function updateDOM(newTransaction) {
    // TODO add radio buttons to define income or outgoing 
    let transactionType = newTransaction.amount > 0 ? "income" : "outgoing"
    let conceptDiv = `<div><p>${newTransaction.concept}</p></div>`
    let amountDiv = `<div><p>${newTransaction.amount}</p></div>`

    let transactionDivString = 
        `<li class="${transactionType} transaction"> <button id="delete-transaction-${newTransaction.id}" class="remove-transaction" onclick="removeTransaction(${newTransaction.id})">X</button>${conceptDiv}${amountDiv} </li>`
    
    let newListElement = document.createElement("li")
    newListElement.innerHTML = transactionDivString
    transactionList.appendChild(newListElement)
    console.log(transactionList) // 


    // needs to be on the button not the list element?
    /* button.addEventListener("click", (event) => {
        let transactionId = event.target.id
        removeTransaction(transactionId)
    }) */
} 

function removeTransaction(id) {
    transactionRecord = transactionRecord.filter((transaction) => transaction.id !== id)
    reset()
}

function processTransactions(transactionRecord){
    let overallBalance = 0.00
    let totalIncome = 0.00
    let totalOutgoing = 0.00

    transactionRecord.forEach((transaction) => {
        let amount = parseFloat(transaction.amount)
        overallBalance += amount

        if(transaction.amount > 0){
            totalIncome += amount
            return
        }

        totalOutgoing += (amount * -1)
    })
    
    let processedTransactions = {
        overallBalance : overallBalance.toFixed(2),
        totalIncome : totalIncome.toFixed(2),
        totalOutgoing : totalOutgoing.toFixed(2)
    }
    return processedTransactions
}

function updateTotals(processedTransactions) {
    currentBalanceElement.innerHTML = `${processedTransactions.overallBalance}€`
    totalIncomeDisplay.innerHTML = `${processedTransactions.totalIncome}€`
    totalOutgoingDisplay.innerHTML = `${processedTransactions.totalOutgoing}€`
}
function clearForm(){
    conceptField.value = ""
    amountField.value = ""
}

function updateLocalStorage() {
    localStorage.setItem("transactionRecord", JSON.stringify(transactionRecord))
}
function reset() {
    transactionList.innerHTML = ""
    let processedTransactions = processTransactions(transactionRecord)
    transactionRecord.forEach(updateDOM)
    if (transactionRecord !== []) {
        updateTotals(processedTransactions)
    }
}
reset()
// Variables to store the transactions and current balance
let transactions = [];
let balance = 0;

// Select necessary elements
// Select necessary elements
const transactionList = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");
const transactionDate = document.getElementById("transaction-date"); // Updated variable name
const transactionType = document.getElementById("transaction-type");
const transactionDescription = document.getElementById("transaction-description");
const transactionAmount = document.getElementById("transaction-amount");
const balanceDisplay = document.getElementById("balance");

// ...rest of the JavaScript code...


// Function to display transactions and update balance
function displayTransactions() {
    // Clear the transaction table body
    transactionList.innerHTML = "";

    transactions.forEach((transaction, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${transaction.date}</td>
        <td id="description-${index}">${transaction.description}</td>
        <td>${transaction.type}</td>
        <td class="${transaction.type}">${transaction.type === "income" ? "+" : "-"}$${transaction.amount.toFixed(2)}</td>
        <td>
          <button class="edit-button" data-index="${index}">Edit</button>
          <button class="delete-button" data-index="${index}">Delete</button>
        </td>
      `;

        transactionList.appendChild(row);
    });

    // Update the balance display
    balanceDisplay.textContent = `Balance: $${balance.toFixed(2)}`;

    // Add event listeners for edit buttons
    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach((button) => {
        button.addEventListener("click", handleEdit);
    });
}
// Function to add a new transaction

// Function to add a new transaction
function addTransaction(e) {
    e.preventDefault();

    const date = transactionDate.value;
    const type = transactionType.value;
    const description = transactionDescription.value;
    const amount = Number(transactionAmount.value);

    // Validate input
    if (description.trim() === "" || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
    }

    // Create a new transaction object
    const transaction = {
        date,
        type,
        description,
        amount,
    };

    // Update the balance and transaction list
    if (type === "income") {
        balance += amount;
    } else {
        balance -= amount;
    }

    transactions.push(transaction);

    // Clear form inputs
    transactionDate.value = "";
    transactionType.value = "income";
    transactionDescription.value = "";
    transactionAmount.value = "";

    // Update the UI
    displayTransactions();
}
// Function to delete a transaction
function deleteTransaction(index) {
    const deletedTransaction = transactions.splice(index, 1)[0];

    // Update the balance
    if (deletedTransaction.type === "income") {
        balance -= deletedTransaction.amount;
    } else {
        balance += deletedTransaction.amount;
    }

    // Update the UI
    displayTransactions();
}

// // Event listeners
// transactionForm.addEventListener("submit", addTransaction);
// transactionList.addEventListener("click", (e) => {
//     if (e.target.classList.contains("delete-button")) {
//         const index = e.target.dataset.index;
//         deleteTransaction(index);
//     }
// });

function editTransaction(index) {
    const transaction = transactions[index];

    // Populate the form with transaction details
    transactionDate.value = transaction.date;
    transactionType.value = transaction.type;
    transactionDescription.value = transaction.description;
    transactionAmount.value = transaction.amount;

    // Remove the transaction from the list
    transactions.splice(index, 1);

    // Update the UI
    displayTransactions();
}

// Event listeners
transactionForm.addEventListener("submit", addTransaction);
transactionList.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-button")) {
        const index = e.target.dataset.index;
        editTransaction(index);
    } else if (e.target.classList.contains("delete-button")) {
        const index = e.target.dataset.index;
        deleteTransaction(index);
    }
});

function handleEdit(e) {
    const index = e.target.dataset.index;
    const descriptionElement = document.getElementById(`description-${index}`);
    const transaction = transactions[index];

    const newDescription = prompt("Enter new description:", transaction.description);
    const newAmount = parseFloat(prompt("Enter new amount:", transaction.amount));

    if (newDescription && !isNaN(newAmount)) {
        transaction.description = newDescription;
        transaction.amount = newAmount;
        descriptionElement.textContent = newDescription;
        displayTransactions();
    }
}

// Initial display
displayTransactions();

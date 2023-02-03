const currencyHolder = document.getElementById("currency");
const balanceHolder = document.getElementById("balance");

const tnxNameHolder = document.getElementById("name");

const tnxAmountHolder = document.getElementById("amount");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const saveButton = document.getElementById("save");
const displayList = document.getElementById("list_of_transactions");
const cancelButton = document.getElementById("cancel");

let symbol =  "$";
let listOfTransaction = [];
let currentBalance = 0;

let editIndex = -1;

function  edit(i){
    editIndex = i;
    tnxNameHolder.value = listOfTransaction[i].name;
    tnxAmountHolder.value = listOfTransaction[i].amount;
    if(listOfTransaction[i].type == "income"){
        income.checked = true
    }
    else{
        expense.checked = true;
    }
    cancelButton.style.display="block";

}

function del(i){
    listOfTransaction=listOfTransaction.filter((e,index) => i !== index);
    render(render);
}

function saveData(){
    localStorage.setItem("symbol", symbol);
    localStorage.setItem("balance",
    currentBalance);
    localStorage.setItem("list", JSON.stringify(listOfTransaction));
}

function loadData(){
    symbol = localStorage.getItem("symbol"); 
    listOfTransaction = JSON.parse(localStorage.getItem("list"));
    currentBalance = Number(localStorage.getItem("balance"));
}

function render() {
    let currentBalance = listOfTransaction.reduce(
        (total, value) => {
            return value.type == "expense" ?  total -value.amount : total + value.amount
        },0
    )

    displayList.innerHTML = "";

    if(listOfTransaction.length ==0){
        displayList.innerHTML += "No Transaction found!"
    }

    else{
        listOfTransaction.forEach((e,i) =>  {
            displayList.innerHTML += `
            <li class="transaction ${e.type}">
            <p>${e.name}</p>
            <div class="right_side">
                <p>${symbol}${e.amount}
                </p>
                <button onclick ="edit(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
                <button onclick = "del(${i})"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </li>`;
        })
    }

    currencyHolder.innerHTML = symbol;
    balanceHolder.innerHTML = currentBalance;
    saveData();
}

cancelButton.addEventListener("click", () => {
    editIndex = -1;
    tnxNameHolder.value= "";
    tnxAmountHolder.value = "";
    cancelButton.style.display = "none";
} )

saveButton.addEventListener("click", () => {
    if(tnxNameHolder.value == "" || Number(
    tnxAmountHolder.value) <= 0) {
        alert("can't do that!");
        return;
    }

    let transaction ={
        name: tnxNameHolder.value,
        amount: Number(tnxAmountHolder.value),
        type: income.checked? "income" : "expense"
    };



    if(editIndex==-1) listOfTransaction.push(transaction);
    else 
        listOfTransaction[editIndex] = transaction;
    editIndex = -1;
    tnxNameHolder.value= "";
    tnxAmountHolder.value = "";
    render();
    cancelButton.style.display = "none";
})

loadData();

render();

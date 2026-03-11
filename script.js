let currentAccount = null;


// Switch between create account and login
function toggleBox(){

let create = document.getElementById("createBox");
let login = document.getElementById("loginBox");

if(create.style.display === "none"){
create.style.display = "block";
login.style.display = "none";
}else{
create.style.display = "none";
login.style.display = "block";
}

}


// Generate random account number
function generateAccountNumber(){
return Math.floor(100000000 + Math.random() * 900000000);
}


// Create Account
function createAccount(){

let name = document.getElementById("name").value;
let pin = document.getElementById("pin").value;

if(name === "" || pin === ""){
document.getElementById("resultBox").innerText = "Please fill all fields";
return;
}

let acc = generateAccountNumber();

let data = {
name: name,
pin: pin,
balance: 0,
history: []
};

localStorage.setItem(acc, JSON.stringify(data));

document.getElementById("resultBox").innerHTML =
"Account Created Successfully <br> Account Number: " + acc;

}


// Login
function login(){

let acc = document.getElementById("loginAcc").value;
let pin = document.getElementById("loginPin").value;

let data = JSON.parse(localStorage.getItem(acc));

if(data && data.pin === pin){

currentAccount = acc;

document.getElementById("loginBox").style.display = "none";
document.getElementById("bankPanel").style.display = "block";

document.getElementById("resultBox").innerText =
"Login Successful. Welcome " + data.name;

}else{

document.getElementById("resultBox").innerText =
"Invalid Account Number or PIN";

}

}


// Show Deposit Input
function showDeposit(){

document.getElementById("actionArea").innerHTML = `
<input class="actionInput" id="depositAmt" placeholder="Enter deposit amount">
<br>
<button class="actionBtn" onclick="deposit()">Submit</button>
`;

}


// Deposit Money
function deposit(){

let amount = Number(document.getElementById("depositAmt").value);

let data = JSON.parse(localStorage.getItem(currentAccount));

data.balance += amount;

data.history.push("Deposited ₹" + amount);

localStorage.setItem(currentAccount, JSON.stringify(data));

document.getElementById("resultBox").innerText =
"Deposit Successful. New Balance ₹" + data.balance;

}


// Show Withdraw Input
function showWithdraw(){

document.getElementById("actionArea").innerHTML = `
<input class="actionInput" id="withdrawAmt" placeholder="Enter withdraw amount">
<br>
<button class="actionBtn" onclick="withdraw()">Submit</button>
`;

}


// Withdraw Money
function withdraw(){

let amount = Number(document.getElementById("withdrawAmt").value);

let data = JSON.parse(localStorage.getItem(currentAccount));

if(data.balance < amount){

document.getElementById("resultBox").innerText =
"Insufficient Balance";

return;

}

data.balance -= amount;

data.history.push("Withdraw ₹" + amount);

localStorage.setItem(currentAccount, JSON.stringify(data));

document.getElementById("resultBox").innerText =
"Withdraw Successful. Balance ₹" + data.balance;

}


// Check Balance
function showBalance(){

let data = JSON.parse(localStorage.getItem(currentAccount));

document.getElementById("resultBox").innerText =
"Current Balance: ₹" + data.balance;

}


// Account Details
function accountDetails(){

let data = JSON.parse(localStorage.getItem(currentAccount));

document.getElementById("resultBox").innerHTML =
"Name: " + data.name + "<br>" +
"Account Number: " + currentAccount + "<br>" +
"Balance: ₹" + data.balance;

}


// Transaction History
function transactionHistory(){

let data = JSON.parse(localStorage.getItem(currentAccount));

if(data.history.length === 0){

document.getElementById("resultBox").innerText =
"No transactions yet";

}else{

document.getElementById("resultBox").innerHTML =
data.history.join("<br>");

}

}


// Logout
function logout(){

currentAccount = null;

document.getElementById("bankPanel").style.display = "none";
document.getElementById("loginBox").style.display = "block";

document.getElementById("actionArea").innerHTML = "";
document.getElementById("resultBox").innerText = "Logged out successfully";

}
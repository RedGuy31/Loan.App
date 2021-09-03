const account1 = {
  owner: "Irakli Maisuradze",
  movements: [250, 400, -400, 3200, -700, -150, 100, 1500],
  interestRate: 1.2, //%
  pin: 3131,
};

const account2 = {
  owner: "Ketevan Gulordava",
  movements: [6000, 4000, -300, -800, -3200, -1000, 8500, -50],
  interestRate: 1.5,
  pin: 1717,
};

const account3 = {
  owner: "Sandro Maisuradze",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3119,
};

const account4 = {
  owner: "Jeremy Maisuradze",
  movements: [430, 1000, 700, 50, 100],
  interestRate: 1,
  pin: 2020,
};

const accounts = [account1, account2, account3, account4];

//Dom Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
 <div class="movements__type 
 movements__type--${type}">${i + 1} ${type} </div>
 <div clas="movements__value">${mov}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);

const calcPrintBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} ₾`;
};

calcPrintBalance(account1.movements);

const calccDisplaySummary = function (movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} ₾`;
  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}₾`;

  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.4) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}₾`;
};
calccDisplaySummary(account1.movements);

const crateUsernames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

crateUsernames(accounts);

// events
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value));
  console.log("LOGIN");
});

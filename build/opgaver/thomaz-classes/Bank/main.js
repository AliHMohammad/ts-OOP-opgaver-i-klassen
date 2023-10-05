import { Bank } from "./Bank.js";
window.addEventListener("load", main);
function main() {
    const myBank = new Bank();
    const aliAccount = myBank.createAccount("Ali");
    console.log(aliAccount.checkBalance());
    aliAccount.deposit(1000);
    console.log(aliAccount.checkBalance());
    const berfinAccount = myBank.createAccount("Berfin", "checking", 150);
    berfinAccount.withdraw(150);
    console.log(berfinAccount.checkBalance());
    berfinAccount.withdraw(132);
}

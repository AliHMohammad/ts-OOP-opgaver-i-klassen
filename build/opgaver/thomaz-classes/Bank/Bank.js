import { Account } from "./Account.js";
import { CheckingAccount } from "./CheckingAccount.js";
import { SavingsAccount } from "./SavingsAccount.js";
export class Bank {
    accounts;
    constructor() {
        this.accounts = [];
    }
    createAccount(ownerName, accountType, overdraftLimit) {
        let account;
        if (accountType === "savings") {
            account = new SavingsAccount(ownerName);
        }
        else if (accountType === "checking" && overdraftLimit) {
            account = new CheckingAccount(ownerName, overdraftLimit);
        }
        else {
            account = new Account(ownerName);
        }
        this.accounts.push(account);
        console.log("New account created with owner name: " + ownerName);
        return account;
    }
    getAccounts() {
        return this.accounts;
    }
}

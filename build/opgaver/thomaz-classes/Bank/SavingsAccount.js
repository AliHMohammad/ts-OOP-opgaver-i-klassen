import { Account } from "./Account.js";
export class SavingsAccount extends Account {
    interestRate;
    constructor(owner) {
        super(owner);
        this.interestRate = 0.015;
    }
    getInterestRate() {
        return this.interestRate;
    }
    addInterst() {
        this.balance += this.balance * this.interestRate;
    }
}

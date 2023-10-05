import { Account } from "./Account.js";

export class SavingsAccount extends Account {
    private interestRate: number;

    constructor(owner: string) {
        super(owner);
        this.interestRate = 0.015;
    }

    public getInterestRate(): number {
        return this.interestRate;
    }

    public addInterst() {
        this.balance += this.balance * this.interestRate; 
    }
}

import { Account } from "./Account.js";

export class CheckingAccount extends Account {
    private maxNegative: number;

    constructor(owner: string, maxNegative: number) {
        super(owner);
        this.maxNegative = maxNegative * -1;
    }

    public withdraw(amount: number): void | Error {
        
        try {
            if (this.maxNegative > this.balance - amount) {
                throw new Error("Max amount for withdraw is reached");
            }

            this.balance -= amount;
            
        } catch (error: any) {
            return error.message
        }
    }
}
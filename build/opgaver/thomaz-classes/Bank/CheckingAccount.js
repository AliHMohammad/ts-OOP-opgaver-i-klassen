import { Account } from "./Account.js";
export class CheckingAccount extends Account {
    maxNegative;
    constructor(owner, maxNegative) {
        super(owner);
        this.maxNegative = maxNegative * -1;
    }
    withdraw(amount) {
        try {
            if (this.maxNegative > this.balance - amount) {
                throw new Error("Max amount for withdraw is reached");
            }
            this.balance -= amount;
        }
        catch (error) {
            return error.message;
        }
    }
}

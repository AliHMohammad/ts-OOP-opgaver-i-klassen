export class Account {
    owner;
    balance;
    constructor(owner) {
        this.owner = owner;
        this.balance = 0;
    }
    deposit(amount) {
        this.balance += amount;
    }
    withdraw(amount) {
        this.balance -= amount;
    }
    checkBalance() {
        return this.balance;
    }
}

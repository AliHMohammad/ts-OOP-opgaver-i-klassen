export class Account {
    protected owner: string;
    protected balance: number;

    constructor(owner: string) {
        this.owner = owner;
        this.balance = 0;
    }

    public deposit(amount: number) {
        this.balance += amount;
    }

    public withdraw(amount: number) {
        this.balance -= amount;
    }

    public checkBalance(): number {
        return this.balance;
    }
}
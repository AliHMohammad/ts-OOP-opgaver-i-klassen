class Bank {
    private _owner: string;
    private _balance: number;

    constructor(owner: string, balance: number) {
        this._owner = owner;
        this._balance = balance;
    }

    protected deposit(amount: number) {
        this._balance += amount;
    }

    protected withdraw(amount: number) {
        this._balance -= amount;
    }
}
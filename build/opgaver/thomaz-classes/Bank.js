"use strict";
class Bank {
    _owner;
    _balance;
    constructor(owner, balance) {
        this._owner = owner;
        this._balance = balance;
    }
    deposit(amount) {
        this._balance += amount;
    }
    withdraw(amount) {
        this._balance -= amount;
    }
}

"use strict";
class StackImplementation {
    _stack;
    constructor() {
        this._stack = [];
    }
    push(newItem) {
        this._stack.push(newItem);
    }
    pop() {
        const item = this._stack.pop();
        if (!item) {
            return "Stack is empty. No item to pop";
        }
        else {
            return item;
        }
    }
    peek() {
        return this._stack[this._stack.length - 1];
    }
    count() {
        return this._stack.length;
    }
}
const aliStack = new StackImplementation();
aliStack.push(10);
aliStack.push(15);
console.log(aliStack.peek());
console.log(aliStack.pop());
console.log(aliStack.peek());

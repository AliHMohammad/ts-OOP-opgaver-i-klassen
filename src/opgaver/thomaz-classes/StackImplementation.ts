class StackImplementation {
    private _stack: number[];

    constructor() {
        this._stack = [];
    }

    public push(newItem: number) {
        this._stack.push(newItem);
    }

    public pop(): number | string {

        const item = this._stack.pop();

        if (!item) {
            return "Stack is empty. No item to pop"
        } else {
            return item;
        }
    }

    public peek(): number {
        return this._stack[this._stack.length -1];
    }

    public count(): number {
        return this._stack.length;
    }
}

const aliStack = new StackImplementation();
aliStack.push(10);
aliStack.push(15);
console.log(aliStack.peek());
console.log(aliStack.pop());
console.log(aliStack.peek());


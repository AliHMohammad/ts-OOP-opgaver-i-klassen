export abstract class Product {
    protected name: string;
    protected price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    getTotalPrice(quantity: number) {
        return this.price * quantity
    }

    getPrice() {
        return this.price;
    }

    abstract getLabel(): string;
}
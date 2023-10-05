export abstract class Product {
    protected name: string;
    public price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    getTotalPrice(quantity: number) {
        return this.price * quantity
    }

    abstract getLabel(): string;
}
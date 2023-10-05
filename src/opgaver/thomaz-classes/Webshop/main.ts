import { Book } from "./Book.js";
import { Clothes } from "./Clothes.js";
import { Electronics } from "./Electronics.js";
import { Product } from "./Product.js";
import { Shop } from "./Shop.js";


window.addEventListener("load", main);

function main() {
    console.log("script is running");
    
    const webshop = new Shop();
    const aliBook = new Book("Ali book", 110, "Martin Buch", 245);
    const myIpad = new Electronics("Ipad", 259, "Apple", "3");
    const tshirt = new Clothes("T-shirt", 50, "M", "Green");

    webshop.addProduct(aliBook)
    webshop.addProduct(myIpad);
    webshop.addProduct(tshirt);
    console.log(webshop.getProducts());
    console.log(webshop.getTotalPrice());
    
    console.log(aliBook.getPrice());

    console.log(webshop.filter(Book)); 
}
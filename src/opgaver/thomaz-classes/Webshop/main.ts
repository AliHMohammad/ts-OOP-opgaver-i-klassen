import { Book } from "./Book.js";
import { Shop } from "./Shop.js";


window.addEventListener("load", main);

function main() {
    console.log("script is running");
    
    const webshop = new Shop();
    const book = new Book("Ali book", 110, "Martin Buch", 245);
    webshop.addProduct(book)
    console.log(webshop.getProducts());
    
}
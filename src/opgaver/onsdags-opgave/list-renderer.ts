import { Member, Render, Result } from "./interfaces";




//TODO: Ændre list datatype til noget klogere
function construct(list: Member[] | Result[], container: HTMLElement, itemRenderer: Render) {
    const listRenderer = {
       
        render() {

            for (const item of list) {
                const html = itemRenderer.render(item)
                container.insertAdjacentHTML("beforeend", html);
            }
        }

        
    };




    return listRenderer
}

export {construct}

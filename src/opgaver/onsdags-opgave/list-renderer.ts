import { Member, Render, Result } from "./interfaces";




//TODO: Ændre list datatype til noget klogere
function construct(list: Member[] | Result[], container: HTMLElement, itemRenderer: Render ) {
    const listRenderer = {
        render() {
            const newObjectArr: Render[] = list.map((item) => {
                const newObject: Render = Object.create(itemRenderer);
                newObject.item = item;
                return newObject;
            });

            // for (const item of list) {
            //     const html = itemRenderer.render(item)
            //     container.insertAdjacentHTML("beforeend", html);
            // }

            for (const item of newObjectArr) {
                const html = item.render();
                container.insertAdjacentHTML("beforeend", html);
            
                

                if (item.postRender && container.lastElementChild) {
                    // @ts-ignore
                    item.postRender(container.lastElementChild);
                }
            }
        },
    };

    return listRenderer;
}


export {construct}

import { Member, Result } from "./interfaces";
import { getDisciplinesInDanish } from "./script.js";

function construct(list: Member[] | Result[], container: HTMLElement, itemRenderer: any) {
    const ListRenderer = {
        render() {
            container.innerHTML = ""
            for (const item of list) {

                const html = itemRenderer.render(item);

                container.insertAdjacentHTML("beforeend", html);
            }
        },
    };

    return ListRenderer;
}

export {construct}
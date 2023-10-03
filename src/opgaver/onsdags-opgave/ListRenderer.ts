import { Member, Result } from "./interfaces";
import { getDisciplinesInDanish } from "./script.js";

function construct(list: Member[] | Result[], container: HTMLElement, itemRenderer: any) {
    const ListRenderer = {
        sortBy: "",
        sortDir: "",
        render() {
            container.innerHTML = ""
            for (const item of list) {

                const html = itemRenderer.render(item);

                container.insertAdjacentHTML("beforeend", html);
            }
        },


        sort(sortBy: string, sortDirection: string) {
            console.log(sortDirection);
            this.sortDir = sortDirection
            this.sortBy = sortBy;
            list.sort((a, b) => {
                if (a[this.sortBy] > b[this.sortBy]) {
                    return 1;
                } else {
                    return -1;
                }
            });

            if (this.sortDir === "DESC") {
                list.reverse();
            }
            
            this.render()
        } 
    };

    return ListRenderer;
}

export {construct}
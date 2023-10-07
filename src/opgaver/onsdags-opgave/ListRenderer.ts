import { Member, Result } from "./interfaces";
import { getDisciplinesInDanish } from "./script.js";

function construct(list: Member[] | Result[], container: HTMLElement, itemRenderer: any) {
    const ListRenderer = {
        container: container,
        itemRenderer: itemRenderer,
        items: list,
        sortBy: "",
        sortDir: "",
        filterProperty: "",
        filterValue: "",

        render() {
            this.container.innerHTML = ""
            for (const item of this.items) {

                const html = this.itemRenderer.render(item);

                this.container.insertAdjacentHTML("beforeend", html);
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
        },


        filter(filterProperty: string, filterValue?: string) {
            console.log(filterProperty);
            console.log(filterValue);
            
            
            this.filterProperty = filterProperty;

            let filteredList = [];
            
            if (filterValue) {
                this.filterValue = filterValue;
                filteredList = this.items.filter(item => item[this.filterProperty] == this.filterValue);
            } else {
                filteredList = this.items.filter(item => item[this.filterProperty]);
            }

            this.items = filteredList;

            this.render()
        }


    };

    return ListRenderer;
}

export {construct}
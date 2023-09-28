import { Member, Render, Result, ConstructInter } from "./interfaces";




//TODO: Ændre list datatype til noget klogere
function construct(list: Member[] | Result[], container: HTMLElement, itemRenderer: Render ) {
    const listRenderer: ConstructInter = {
        newObjectArr: [],

        render() {

            this.newObjectArr = list.map((item) => {
                const newObject: Render = Object.create(itemRenderer);
                newObject.item = item;
                return newObject;
            });

            this.filter();

            for (const item of this.newObjectArr) {

                const html = item.render();
                container.insertAdjacentHTML("beforeend", html);

                if (item.postRender && container.lastElementChild) {
                    item.postRender(container.lastElementChild);
                }
            }
        },

        sort(sortBy: string, sortDir: string) {
            console.log(sortDir);
            console.log(sortBy);
            

            if (sortBy === "age") {
                // @ts-ignore
                list.sort((a, b) => a.age - b.age);
            } else if (sortBy === "name") {
                // @ts-ignore
                list.sort((b, a) => a.name.localeCompare(b.name));
            }

            if (sortDir === "ASC") {
                list.reverse();
            }

            this.clear()
            this.render()
        },

        filter() {
            const filterElement = document.querySelector("#filter") as HTMLSelectElement;
            const value = filterElement.value;

            if (value === "active") {
                this.newObjectArr = this.newObjectArr.filter((renderer) => renderer.item.isActiveMember === true);
            } else if (value === "inactive") {
                this.newObjectArr = this.newObjectArr.filter((renderer) => renderer.item.isActiveMember === false);
            }
        },

        clear() {
            this.newObjectArr = [];
            document.querySelector("#members tbody")!.innerHTML = "";
            document.querySelector("#results tbody")!.innerHTML = "";
        }
    };

    return listRenderer;
}


export {construct}

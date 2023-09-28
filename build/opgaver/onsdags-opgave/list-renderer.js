//TODO: Ændre list datatype til noget klogere
function construct(list, container, itemRenderer) {
    const listRenderer = {
        newObjectArr: [],
        render() {
            this.newObjectArr = list.map((item) => {
                const newObject = Object.create(itemRenderer);
                newObject.item = item;
                return newObject;
            });
            for (const item of this.newObjectArr) {
                const html = item.render();
                container.insertAdjacentHTML("beforeend", html);
                if (item.postRender && container.lastElementChild) {
                    item.postRender(container.lastElementChild);
                }
            }
        },
        sort(sortBy, sortDir) {
            console.log(sortDir);
            console.log(sortBy);
            if (sortBy === "age") {
                // @ts-ignore
                list.sort((a, b) => a.age - b.age);
            }
            else if (sortBy === "name") {
                // @ts-ignore
                list.sort((b, a) => a.name.localeCompare(b.name));
            }
            if (sortDir === "ASC") {
                list.reverse();
            }
            this.clear();
            this.render();
        },
        clear() {
            this.newObjectArr = [];
            document.querySelector("#members tbody").innerHTML = "";
            document.querySelector("#results tbody").innerHTML = "";
        }
    };
    return listRenderer;
}
export { construct };

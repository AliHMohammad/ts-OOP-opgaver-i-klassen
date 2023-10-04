export class ListRenderer {
    static render(items, container) {
        container.innerHTML = "";
        for (const item of items) {
            const html = item.render();
            container.insertAdjacentHTML("beforeend", html);
            if (container.lastElementChild) {
                item.postRender(container.lastElementChild);
            }
        }
    }
    render() { }
    postRender(container) { }
    static sort(listOfItems, property, dataType) {
        if (dataType === "string") {
            listOfItems.sort((a, b) => a._item[property].localeCompare(b._item[property]));
        }
        else if (dataType === "number") {
            listOfItems.sort((a, b) => a._item[property] - b._item[property]);
        }
        else if (dataType === "date") {
            listOfItems.sort((a, b) => new Date(a._item[property]).getTime() - new Date(b._item[property]).getTime());
        }
    }
    static filter(listOfItems, property) {
        let result = [];
        if (property === "none") {
            return listOfItems;
        }
        if (property === "isActiveMember") {
            result = listOfItems.filter((index) => index._item.isActiveMember === true);
        }
        else if (property === "!isActiveMember") {
            result = listOfItems.filter((index) => index._item.isActiveMember === false);
        }
        else if (property === "senior") {
            result = listOfItems.filter((index) => index._item.isSenior());
        }
        else if (property === "junior") {
            result = listOfItems.filter((index) => index._item.isJunior());
        }
        else if (property === "competition") {
            //@ts-ignore
            result = listOfItems.filter((index) => index._item.isCompetition());
        }
        else if (property === "training") {
            //@ts-ignore
            result = listOfItems.filter((index) => index._item.isTraining());
        }
        return result;
    }
}

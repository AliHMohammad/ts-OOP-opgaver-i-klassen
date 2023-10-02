export class ListRenderer {
    render() { }
    postRender(container) { }
    static clear(container) {
        container.innerHTML = "";
    }
    static sort(listOfItems, property, dataType) {
        if (dataType === "string") {
            this.sortByString(listOfItems, property);
        }
        else if (dataType === "number") {
            this.sortByNumber(listOfItems, property);
        }
        else if (dataType === "date") {
            this.sortByDate(listOfItems, property);
        }
    }
    static sortByDate(listOfItems, property) {
        listOfItems.sort((a, b) => new Date(a._item[property]).getTime() - new Date(b._item[property]).getTime());
    }
    static sortByNumber(listOfItems, property) {
        console.log("sort number");
        listOfItems.sort((a, b) => a._item[property] - b._item[property]);
    }
    static sortByString(listOfItems, property) {
        console.log("sort string");
        listOfItems.sort((a, b) => a._item[property].localeCompare(b._item[property]));
    }
    static filter(listOfItems, property) {
        let result = [];
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
            result = listOfItems.filter((index) => index._item.isCompetition());
        }
        else if (property === "training") {
            result = listOfItems.filter((index) => index._item.isTraining());
        }
        return result;
    }
}

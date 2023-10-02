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
        listOfItems.sort((a, b) => new Date(a._member[property]).getTime() - new Date(b._member[property]).getTime());
    }
    static sortByNumber(listOfItems, property) {
        console.log("sort number");
        listOfItems.sort((a, b) => a._member[property] - b._member[property]);
    }
    static sortByString(listOfItems, property) {
        console.log("sort string");
        listOfItems.sort((a, b) => a._member[property].localeCompare(b._member[property]));
    }
    static filter(memberArr, property) {
        let result = [];
        if (property === "isActiveMember") {
            result = memberArr.filter((item) => item._member.isActiveMember === true);
        }
        else if (property === "!isActiveMember") {
            result = memberArr.filter((item) => item._member.isActiveMember === false);
        }
        else if (property === "senior") {
            result = memberArr.filter((item) => item._member.isSenior());
        }
        else if (property === "junior") {
            result = memberArr.filter((item) => item._member.isJunior());
        }
        return result;
    }
}

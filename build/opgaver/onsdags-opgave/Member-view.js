import { membersRenderArr } from "./script.js";
import { ListRenderer } from "./ListRenderer.js";
import { discipliner } from "./Result-view.js";
function getDisciplinesInDanish(disciplines) {
    const danskArr = [];
    if (!disciplines) {
        return null;
    }
    for (const discipline of disciplines) {
        danskArr.push(discipliner[discipline]);
    }
    return danskArr.join(", ");
}
function sortFilterMembers() {
    //HTML elements
    const filterElement = document.querySelector("#filter-members");
    const sortElement = document.querySelector("#sort-members");
    const sortByElement = document.querySelector("#sort-order-members");
    //FILTER
    const filterValue = filterElement.value;
    const filteredmembers = ListRenderer.filter(membersRenderArr, filterValue);
    //SORT
    const sortValue = sortElement.value;
    const sortDirection = sortByElement.value;
    let sortDataType = "string";
    if (sortValue === "age") {
        sortDataType = "number";
    }
    ListRenderer.sort(filteredmembers, sortValue, sortDataType);
    if (sortDirection === "DESC") {
        filteredmembers.reverse();
    }
    const container = document.querySelector("#members tbody");
    ListRenderer.render(filteredmembers, container);
}
export { sortFilterMembers, getDisciplinesInDanish };

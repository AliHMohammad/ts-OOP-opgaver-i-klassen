import { MemberRender } from "./MemberRender.js";
import { membersRenderArr } from "./script.js";
function getDisciplinesInDanish(disciplines) {
    const danskArr = [];
    if (!disciplines) {
        return null;
    }
    for (const discipline of disciplines) {
        danskArr.push(discipline);
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
    console.log(filterValue);
    const filteredmembers = MemberRender.filter(membersRenderArr, filterValue);
    console.log(filteredmembers);
    //SORT
    const sortValue = sortElement.value;
    const sortByValue = sortByElement.value;
    let sortDataType = "string";
    if (sortValue === "age") {
        sortDataType = "number";
    }
    MemberRender.sort(filteredmembers, sortValue, sortDataType);
    if (sortByValue === "DESC") {
        filteredmembers.reverse();
    }
    renderAllMembers(filteredmembers);
}
function renderAllMembers(members) {
    const container = document.querySelector("#members tbody");
    MemberRender.clear(container);
    for (const member of members) {
        const html = member.render();
        container.insertAdjacentHTML("beforeend", html);
        if (container.lastElementChild) {
            member.postRender(container.lastElementChild);
        }
    }
}
export { sortFilterMembers, getDisciplinesInDanish };

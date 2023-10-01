import { MemberRender } from "./MemberRender.js";
import { membersRenderArr } from "./script.js";
function sortFilterMembers() {
    //HTML elements
    const filterElement = document.querySelector("#filter-members");
    const sortElement = document.querySelector("#sort-members");
    //FILTER
    const filterValue = filterElement.value;
    console.log(filterValue);
    const filteredmembers = MemberRender.filter(membersRenderArr, filterValue);
    console.log(filteredmembers);
    //SORT
    const sortByElement = document.querySelector("#sort-order-members");
    const sortValue = sortElement.value;
    const sortByValue = sortByElement.value;
    let sortDataType = "string";
    if (sortValue === "age") {
        sortDataType = "number";
    }
    else if (sortValue === "dateOfBirth") {
        sortDataType = "date";
    }
    MemberRender.sort(filteredmembers, sortValue, sortDataType);
    if (sortByValue === "DESC") {
        filteredmembers.reverse();
    }
    renderAllMembers(filteredmembers);
}
function renderAllMembers(members) {
    MemberRender.clear(document.querySelector("#members tbody"));
    for (const member of members) {
        const container = document.querySelector("#members tbody");
        const html = member.render();
        container.insertAdjacentHTML("beforeend", html);
        if (container.lastElementChild) {
            member.postRender(container.lastElementChild);
        }
    }
}
export { sortFilterMembers };

import { MemberRender } from "./MemberRender.js";
import { membersArr, membersRenderArr } from "./script.js";
import { Member } from "./Member.js";

function getDisciplinesInDanish(disciplines: string[] | undefined): string | null {
    const danskArr: string[] = [];

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
    const filterElement = document.querySelector("#filter-members") as HTMLSelectElement;
    const sortElement = document.querySelector("#sort-members") as HTMLSelectElement;
    const sortByElement = document.querySelector("#sort-order-members") as HTMLSelectElement;

    //FILTER
    const filterValue = filterElement.value;
    console.log(filterValue);

    const filteredmembers = MemberRender.filter(membersRenderArr, filterValue);

    console.log(filteredmembers);

    //SORT
    const sortValue = sortElement.value as keyof Member;
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

function renderAllMembers(members: MemberRender[]) {
    const container = document.querySelector("#members tbody") as HTMLElement;
    MemberRender.clear(container);
    for (const member of members) {
        const html = member.render();
        container.insertAdjacentHTML("beforeend", html);

        if (container.lastElementChild) {
            member.postRender(container.lastElementChild as HTMLElement);
        }
    }
}


export {sortFilterMembers, getDisciplinesInDanish}
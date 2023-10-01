import { MemberRender } from "./MemberRender.js";
import { membersRenderArr } from "./script.js";
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

    //FILTER
    const filterValue = filterElement.value;
    console.log(filterValue);

    const filteredmembers = MemberRender.filter(membersRenderArr, filterValue);

    console.log(filteredmembers);

    //SORT
    const sortByElement = document.querySelector("#sort-order-members") as HTMLSelectElement;
    const sortValue = sortElement.value as keyof Member;
    const sortByValue = sortByElement.value;
    let sortDataType = "string";

    if (sortValue === "age") {
        sortDataType = "number";
    } else if (sortValue === "dateOfBirth") {
        sortDataType = "date";
    }

    MemberRender.sort(filteredmembers, sortValue, sortDataType);

    if (sortByValue === "DESC") {
        filteredmembers.reverse();
    }

    renderAllMembers(filteredmembers);
}

function renderAllMembers(members: MemberRender[]) {
    MemberRender.clear(document.querySelector("#members tbody") as HTMLElement);
    for (const member of members) {
        const container = document.querySelector("#members tbody") as HTMLElement;
        const html = member.render();
        container.insertAdjacentHTML("beforeend", html);

        if (container.lastElementChild) {
            member.postRender(container.lastElementChild as HTMLElement);
        }
    }
}


export {sortFilterMembers, getDisciplinesInDanish}
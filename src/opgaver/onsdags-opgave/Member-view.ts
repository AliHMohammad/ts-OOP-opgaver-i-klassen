import { MemberRender } from "./MemberRender.js";
import { membersArr, membersRenderArr } from "./script.js";
import { Member } from "./Member.js";
import { ListRenderer } from "./ListRenderer.js";
import { discipliner } from "./Result-view.js";


function getDisciplinesInDanish(disciplines: string[] | undefined): string | null {
    const danskArr: string[] = [];

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
    const sortDirection = sortByElement.value;
    let sortDataType = "string";

    if (sortValue === "age") {
        sortDataType = "number";
    } 

    MemberRender.sort(filteredmembers, sortValue, sortDataType);

    if (sortDirection === "DESC") {
        filteredmembers.reverse();
    }

    const container = document.querySelector("#members tbody") as HTMLElement;
    ListRenderer.render(filteredmembers, container)
}


export {sortFilterMembers, getDisciplinesInDanish}
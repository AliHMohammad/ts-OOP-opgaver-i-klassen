import { MemberRender } from "./MemberRender.js";
import { membersRenderArr } from "./script.js";
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

    const filteredmembers: MemberRender[] = ListRenderer.filter(membersRenderArr, filterValue);


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

    const container = document.querySelector("#members tbody") as HTMLElement;
    ListRenderer.render(filteredmembers, container)
}


export {sortFilterMembers, getDisciplinesInDanish}
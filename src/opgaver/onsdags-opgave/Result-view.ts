import { ListRenderer } from "./ListRenderer.js";
import { ResultRender } from "./ResultRender.js";
import { resultsRenderArr } from "./script.js";


const discipliner: { [key: string]: string } = {
    breaststroke: "Bryst",
    backstroke: "Ryg",
    freestyle: "Fristil",
    butterfly: "Sommerfugl",
};

function sortFilterResults() {
    const sortElement = document.querySelector("#sort-results") as HTMLSelectElement;
    const filterElement = document.querySelector("#filter-results") as HTMLSelectElement;
    const sortByElement = document.querySelector("#sort-order-results") as HTMLSelectElement;

    //FILTER
    const filterValue = filterElement.value;

    const filteredResults: ResultRender[] = ListRenderer.filter(resultsRenderArr, filterValue);
    

    //SORT
    const sortValue = sortElement.value;
    const sortDirection = sortByElement.value;
    let sortDataType = "string";

    if (sortValue === "time") {
        sortDataType = "number";
    } else if (sortValue === "date") {
        sortDataType = "date";
    }
    
    ListRenderer.sort(filteredResults, sortValue, sortDataType);

    if (sortDirection === "DESC") {
        filteredResults.reverse();
    }

    const container = document.querySelector("#results tbody") as HTMLElement;
    ListRenderer.render(filteredResults, container);
}


export { discipliner, sortFilterResults };
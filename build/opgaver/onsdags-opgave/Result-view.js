import { ListRenderer } from "./ListRenderer.js";
import { ResultRender } from "./ResultRender.js";
import { resultsRenderArr } from "./script.js";
const discipliner = {
    breaststroke: "Bryst",
    backstroke: "Ryg",
    freestyle: "Fristil",
    butterfly: "Sommerfugl",
};
function sortFilterResults() {
    const sortElement = document.querySelector("#sort-results");
    const filterElement = document.querySelector("#filter-results");
    const sortByElement = document.querySelector("#sort-order-results");
    //FILTER
    const filterValue = filterElement.value;
    console.log(filterValue);
    //@ts-ignore
    const filteredResults = ResultRender.filter(resultsRenderArr, filterValue);
    //SORT
    const sortValue = sortElement.value;
    const sortDirection = sortByElement.value;
    let sortDataType = "string";
    if (sortValue === "time") {
        sortDataType = "number";
    }
    else if (sortValue === "date") {
        sortDataType = "date";
    }
    console.log(sortValue);
    console.log(sortDirection);
    //@ts-ignore
    ResultRender.sort(filteredResults, sortValue, sortDataType);
    if (sortDirection === "DESC") {
        filteredResults.reverse();
    }
    const container = document.querySelector("#results tbody");
    ListRenderer.render(filteredResults, container);
}
export { discipliner, sortFilterResults };

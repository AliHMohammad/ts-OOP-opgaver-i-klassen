import { ListRenderer } from "./ListRenderer.js";
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
    const filteredResults = ListRenderer.filter(resultsRenderArr, filterValue);
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
    ListRenderer.sort(filteredResults, sortValue, sortDataType);
    if (sortDirection === "DESC") {
        filteredResults.reverse();
    }
    const container = document.querySelector("#results tbody");
    ListRenderer.render(filteredResults, container);
}
export { discipliner, sortFilterResults };

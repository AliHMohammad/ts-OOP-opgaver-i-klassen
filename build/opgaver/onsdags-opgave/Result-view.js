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
    let filteredResults = resultsRenderArr;
    console.log(filteredResults);
    if (filterValue !== "none") {
        filteredResults = ResultRender.filter(resultsRenderArr, filterValue);
    }
    //SORT
    const sortValue = sortElement.value;
    const sortByValue = sortByElement.value;
    let sortDataType = "string";
    if (sortValue === "time") {
        sortDataType = "number";
    }
    else if (sortValue === "date") {
        sortDataType = "date";
    }
    console.log(sortValue);
    console.log(sortByValue);
    ResultRender.sort(filteredResults, sortValue, sortDataType);
    if (sortByValue === "DESC") {
        filteredResults.reverse();
    }
    renderAllResults(filteredResults);
}
function renderAllResults(results) {
    const container = document.querySelector("#results tbody");
    ResultRender.clear(container);
    for (const result of results) {
        const html = result.render();
        container.insertAdjacentHTML("beforeend", html);
        if (container.lastElementChild) {
            result.postRender(container.lastElementChild);
        }
    }
}
export { discipliner, renderAllResults, sortFilterResults };

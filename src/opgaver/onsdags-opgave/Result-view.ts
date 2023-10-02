import { Result } from "./Result.js";
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
    console.log(filterValue);

    let filteredResults: ResultRender[] = resultsRenderArr;
    console.log(filteredResults);

    if (filterValue !== "none") {
        //@ts-ignore
        filteredResults = ResultRender.filter(resultsRenderArr, filterValue);
    }

    //SORT
    const sortValue = sortElement.value as keyof Result;
    const sortByValue = sortByElement.value;
    let sortDataType = "string";

    if (sortValue === "time") {
        sortDataType = "number";
    } else if (sortValue === "date") {
        sortDataType = "date";
    }

    console.log(sortValue);
    console.log(sortByValue);

    //@ts-ignore
    ResultRender.sort(filteredResults, sortValue, sortDataType);

    if (sortByValue === "DESC") {
        filteredResults.reverse();
    }

    renderAllResults(filteredResults);
}

function renderAllResults(results: ResultRender[]) {
    const container = document.querySelector("#results tbody") as HTMLElement;
    ResultRender.clear(container);

    for (const result of results) {
        const html = result.render();
        container.insertAdjacentHTML("beforeend", html)

        if (container.lastElementChild) {
            result.postRender(container.lastElementChild as HTMLElement);
        }
    }
}


export { discipliner, renderAllResults, sortFilterResults };
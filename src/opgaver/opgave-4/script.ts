import * as helper from "./helper.js"
import { Raw, Result } from "./helper.js";


window.addEventListener("load", main);

let raw: Raw[] = [];
let results: Result[] = [];

async function main(event: Event) {
    console.log("script is running");
    raw = await getData();
    results = createResultsArr(raw);
    sortResults(results);
    showResults(results);
}

function showResults(results: Result[]) {
    console.log("show results");

    for (const result of results) {
        showResult(result);
    }
}

function showResult(result: Result) {
    const html = /*html*/ `
    <tr>
        <td>${result.id}</td>
        <td>${result.getDate()}</td>
        <td>${result.discipline}</td>
        <td>${result.type}</td>
        <td>${result.time}</td>
    </tr>
    `;

    document.querySelector("#results-table tbody")?.insertAdjacentHTML("beforeend", html);
}

function sortResults(results: Result[]) {
    results.sort((a: Result, b: Result) => a.getTime() - b.getTime());
}

async function getData() {
    return await (await fetch("../../../results.json")).json();
}

function createResultsArr(raw: Raw[]): Result[] {
    const resultsArr: Result[] = [];
    for (const index of raw) {
        resultsArr.push(helper.factoryFunction(index));
    }
    return resultsArr
}



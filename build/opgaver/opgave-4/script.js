import * as helper from "./helper.js";
window.addEventListener("load", main);
let raw = [];
let results = [];
async function main(event) {
    console.log("script is running");
    raw = await getData();
    results = createResultsArr(raw);
    sortResults(results);
    showResults(results);
}
function showResults(results) {
    console.log("show results");
    for (const result of results) {
        showResult(result);
    }
}
function showResult(result) {
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
function sortResults(results) {
    results.sort((a, b) => a.getTime() - b.getTime());
}
async function getData() {
    return await (await fetch("../../../results.json")).json();
}
function createResultsArr(raw) {
    const resultsArr = [];
    for (const index of raw) {
        resultsArr.push(helper.factoryFunction(index));
    }
    return resultsArr;
}

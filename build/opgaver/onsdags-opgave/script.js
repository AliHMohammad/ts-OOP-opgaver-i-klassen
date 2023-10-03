import { initTabs } from "./tabs.js";
import * as factoryConstructor from "./factories.js";
import * as ListRenderer from "./ListRenderer.js";
import { MemberRenderer } from "./MemberRenderer.js";
import { ResultRenderer } from "./ResultRenderer.js";
window.addEventListener("load", initApp);
let membersArr = [];
let resultsArr = [];
let memberList = [];
let resultList = [];
async function initApp() {
    initTabs();
    const rawMembersArr = await getMembers();
    const rawResultsArr = await getResults();
    constructMembers(rawMembersArr);
    constructResults(rawResultsArr);
    const containerMember = document.querySelector("#members tbody");
    memberList = ListRenderer.construct(membersArr, containerMember, MemberRenderer);
    const containerResult = document.querySelector("#results tbody");
    resultList = ListRenderer.construct(resultsArr, containerResult, ResultRenderer);
    memberList.render();
    resultList.render();
    // showMembers(membersArr);
    // showResults(resultsArr);
    initiateEventListeners();
}
function initiateEventListeners() {
    document.querySelector("#sort-members")?.addEventListener("change", getSortValuesMember);
    document.querySelector("#sort-order-members")?.addEventListener("change", getSortValuesMember);
    document.querySelector("#sort-results")?.addEventListener("change", getSortValuesResult);
    document.querySelector("#sort-order-results")?.addEventListener("change", getSortValuesResult);
    document.querySelector("#filter-members")?.addEventListener("change", filterMembers);
    document.querySelector("#filter-results")?.addEventListener("change", filterResults);
}
function getSortValuesMember(event) {
    const sortElement = document.querySelector("#sort-members");
    const sortByElement = document.querySelector("#sort-order-members");
    const sortValue = sortElement.value;
    const sortByValue = sortByElement.value;
    memberList.sort(sortValue, sortByValue);
}
function getSortValuesResult(event) {
    const sortElement = document.querySelector("#sort-results");
    const sortByElement = document.querySelector("#sort-order-results");
    const sortValue = sortElement.value;
    const sortByValue = sortByElement.value;
    resultList.sort(sortValue, sortByValue);
}
function filterMembers(event) {
    const filterElement = document.querySelector("#filter-members");
    const filterValue = filterElement.value;
    if (filterValue.includes(":")) {
        const [property, value] = filterValue.split(":");
        memberList.filter(property, value);
    }
    else {
        memberList.filter(filterValue);
    }
}
function filterResults(event) {
    const filterElement = document.querySelector("#filter-members");
    const filterValue = filterElement.value;
    if (filterValue.includes(":")) {
        const [property, value] = filterValue.split(":");
        resultList.filter(property, value);
    }
    else {
        resultList.filter(filterValue);
    }
}
function getDisciplinesInDanish(disciplines) {
    const danskArr = [];
    if (!disciplines) {
        return null;
    }
    for (const discipline of disciplines) {
        danskArr.push(discipline);
    }
    return danskArr.join(", ");
}
async function getMembers() {
    return await (await fetch("../../../data/members.json")).json();
}
async function getResults() {
    return await (await fetch("../../../data/results.json")).json();
}
function constructMembers(rawMembers) {
    for (const rawMember of rawMembers) {
        membersArr.push(factoryConstructor.factoryMember(rawMember));
    }
}
function constructResults(rawResults) {
    for (const rawResult of rawResults) {
        resultsArr.push(factoryConstructor.factoryResult(rawResult));
    }
}
export { membersArr, resultsArr, getDisciplinesInDanish };

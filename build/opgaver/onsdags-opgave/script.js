import { initTabs } from "./tabs.js";
import * as factoryConstructor from "./factories.js";
import * as ListRenderer from "./ListRenderer.js";
import { MemberRenderer } from "./MemberRenderer.js";
import { ResultRenderer } from "./ResultRenderer.js";
window.addEventListener("load", initApp);
let membersArr = [];
let resultsArr = [];
async function initApp() {
    initTabs();
    const rawMembersArr = await getMembers();
    const rawResultsArr = await getResults();
    constructMembers(rawMembersArr);
    constructResults(rawResultsArr);
    const containerMember = document.querySelector("#members tbody");
    const memberList = ListRenderer.construct(membersArr, containerMember, MemberRenderer);
    const containerResult = document.querySelector("#results tbody");
    const resultList = ListRenderer.construct(resultsArr, containerResult, ResultRenderer);
    memberList.render();
    resultList.render();
    sortMembers();
    sortResults();
    // showMembers(membersArr);
    // showResults(resultsArr);
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
function sortResults() {
    resultsArr.sort((a, b) => a.time - b.time);
}
function sortMembers() {
    membersArr.sort((a, b) => a.name.localeCompare(b.name));
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

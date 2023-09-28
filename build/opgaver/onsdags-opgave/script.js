import { initTabs } from "./tabs.js";
import * as construct from "./factories.js";
import * as listRendererConstruct from "./list-renderer.js";
window.addEventListener("load", initApp);
const discipliner = {
    breaststroke: "Bryst",
    backstroke: "Ryg",
    freestyle: "Fristil",
    butterfly: "Sommerfugl",
};
let membersArr = [];
let resultsArr = [];
async function initApp() {
    initTabs();
    const rawMembersArr = await getMembers();
    const rawResultsArr = await getResults();
    constructMembers(rawMembersArr);
    constructResults(rawResultsArr);
    sortMembers();
    sortResults();
    // showMembers(membersArr);
    const memberContainer = document.querySelector("#members tbody");
    const listRenderer = listRendererConstruct.construct(membersArr, memberContainer);
    listRenderer.render();
    showResults(resultsArr);
}
function showMembers(members) {
    for (const member of members) {
        const danskDiscipliner = getDisciplinesInDanish(member.disciplines);
        const html = /*html*/ `
        <tr>
            <td>${member.name}</td>
            <td>${member.isActiveMember ? "Ja" : "Nej"}</td>
            <td>${member.dateOfBirthToString}</td>
            <td>${member.age}</td>
            <td>${danskDiscipliner ? danskDiscipliner : "Ingen"}</td>
        </tr>
        `;
        document.querySelector("#members tbody")?.insertAdjacentHTML("beforeend", html);
    }
}
function showResults(results) {
    for (const result of results) {
        showResult(result);
    }
}
function showResult(result) {
    const html = /*html*/ `
    <tr>
        <td>${result.dateToString}</td>
        <td>${result.member ? result.member.name : "Ukendt"}</td>
        <td>${discipliner[`${result.discipline}`]}</td>
        <td>${result.resultType === "competition" ? "Kompetitiv" : "Træning"}</td>
        <td>${result.timeToString}</td>
    </tr>
    `;
    document.querySelector("#results tbody")?.insertAdjacentHTML("beforeend", html);
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
        membersArr.push(construct.factoryMember(rawMember));
    }
}
function constructResults(rawResults) {
    for (const rawResult of rawResults) {
        resultsArr.push(construct.factoryResult(rawResult));
    }
}
export { membersArr, resultsArr, getDisciplinesInDanish };

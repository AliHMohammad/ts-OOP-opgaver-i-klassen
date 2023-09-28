import { initTabs } from "./tabs.js";
import * as construct from "./factories.js";
window.addEventListener("load", initApp);
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
    showMembers(membersArr);
    showResults(resultsArr);
}
function showMembers(members) {
    for (const member of members) {
        showMember(member);
    }
}
function showMember(member) {
    const html = /*html*/ `
    <tr>
        <td>${member.name}</td>
        <td>${member.isActiveMember}</td>
        <td>${member.dateOfBirthToString}</td>
        <td>${member.age}</td>
        <td>${member.disciplines}</td>
    </tr>
    `;
    document.querySelector("#members tbody")?.insertAdjacentHTML("beforeend", html);
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
        <td>${result.discipline}</td>
        <td>${result.resultType}</td>
        <td>${result.timeToString}</td>
    </tr>
    `;
    document.querySelector("#results tbody")?.insertAdjacentHTML("beforeend", html);
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
export { membersArr, resultsArr };

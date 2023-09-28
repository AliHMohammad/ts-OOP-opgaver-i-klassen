import { initTabs } from "./tabs.js";
import { Member, RawMember, RawResult, Result } from "./interfaces.js";
import * as construct from "./factories.js";

window.addEventListener("load", initApp);

let membersArr: Member[] = [];
let resultsArr: Result[] = [];

async function initApp() {
    initTabs();
    const rawMembersArr: RawMember[] = await getMembers();
    const rawResultsArr: RawResult[] = await getResults();

    constructMembers(rawMembersArr);
    constructResults(rawResultsArr);

    sortMembers();
    sortResults();

    showMembers(membersArr);
    showResults(resultsArr);
}

function showMembers(members: Member[]) {
    for (const member of members) {
        showMember(member);
    }
}

function showMember(member: Member) {
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

function showResults(results: Result[]) {
    for (const result of results) {
        showResult(result);
    }
}

function showResult(result: Result) {
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
    resultsArr.sort((a: Result, b: Result) => a.time - b.time);
}

function sortMembers() {
    membersArr.sort((a: Member, b: Member) => a.name.localeCompare(b.name));
}

async function getMembers(): Promise<RawMember[]> {
    return await (await fetch("../../../data/members.json")).json();
}

async function getResults(): Promise<RawResult[]> {
    return await (await fetch("../../../data/results.json")).json();
}

function constructMembers(rawMembers: RawMember[]) {
    for (const rawMember of rawMembers) {
        membersArr.push(construct.factoryMember(rawMember));
    }
}

function constructResults(rawResults: RawResult[]) {
    for (const rawResult of rawResults) {
        resultsArr.push(construct.factoryResult(rawResult));
    }
}

export { membersArr, resultsArr };

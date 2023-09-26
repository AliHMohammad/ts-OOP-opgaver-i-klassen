import { initTabs } from "./tabs.js";
import { Member, RawMember, RawResult, Result } from "./interfaces.js";
import { factoryMember, factoryResult } from "./factories.js";

window.addEventListener("load", initApp);

let membersArr: Member[] = []
let resultsArr: Result[] = []

async function initApp() {
    initTabs();
    const rawMembersArr: RawMember[] = await getMembers();
    const rawResultsArr: RawResult[] = await getResults();

    constructMembers(rawMembersArr);
    constructResults(rawResultsArr);

    showMembers(membersArr)
    showResults(resultsArr)
}

function showMembers(members: Member[]) {
    
    for (const member of members) {
        showMember(member)
    }
}

function showMember(member: Member) {
    const html = /*html*/ `
    <tr>
        <td>${member.name}</td>
        <td>${member.isActiveMember}</td>
        <td>${member.dateOfBirth}</td>
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
        <td>${result.date}</td>
        <td>${result.member ? result.member.name : "Ukendt"}</td>
        <td>${result.discipline}</td>
        <td>${result.resultType}</td>
        <td>${result.time}</td>
    </tr>
    `;

    document.querySelector("#results tbody")?.insertAdjacentHTML("beforeend", html);
}

async function getMembers(): Promise<RawMember[]> {
    return await (await fetch("../../../data/members.json")).json();
}

async function getResults(): Promise<RawResult[]>{
    return await (await fetch("../../../data/results.json")).json();
}

function constructMembers(rawMembers: RawMember[]) {
    for (const rawMember of rawMembers) {
        membersArr.push(factoryMember(rawMember));
    }
}

function constructResults(rawResults: RawResult[]) {
    for (const rawResult of rawResults) {
        resultsArr.push(factoryResult(rawResult));
    }
}



export {membersArr, resultsArr}
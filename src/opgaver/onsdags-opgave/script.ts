import { initTabs } from "./tabs.js";
import { Member as MemberInterface, RawMember, RawResult, Result } from "./interfaces.js";
import * as construct from "./factories.js";
import { Member } from "./Member.js";
import { MemberRender } from "./MemberRender.js";
import { createMemberArr, createMemberRenderArr } from "./Member-controller.js";
import { sortFilterMembers } from "./Member-view.js";

window.addEventListener("load", initApp);

const discipliner: { [key: string]: string } = {
    breaststroke: "Bryst",
    backstroke: "Ryg",
    freestyle: "Fristil",
    butterfly: "Sommerfugl",
};

let membersArr: Member[] = [];
let membersRenderArr: MemberRender[] = [];

let resultsArr: Result[] = [];

async function initApp() {
    initTabs();
    const rawMembersArr: RawMember[] = await getMembers();
    const rawResultsArr: RawResult[] = await getResults();

    createMemberArr(rawMembersArr);
    createMemberRenderArr(rawMembersArr);

    // renderAllMembers(membersRenderArr);
    // MemberRender.sort(membersRenderArr, "name", "string");
    // renderAllMembers(membersRenderArr);

    sortFilterMembers()

    // constructResults(rawResultsArr);

    // sortMembers();
    // sortResults();

    // showMembers(membersArr);

    // showResults(resultsArr);
    initiateEventListeners();
}

function initiateEventListeners() {
    document.querySelector("#filter-members")?.addEventListener("change", sortFilterMembers);
    document.querySelector("#sort-members")?.addEventListener("change", sortFilterMembers);
    document.querySelector("#sort-order-members")?.addEventListener("change", sortFilterMembers);
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
        <td>${discipliner[`${result.discipline}`]}</td>
        <td>${result.resultType === "competition" ? "Kompetitiv" : "Træning"}</td>
        <td>${result.timeToString}</td>
    </tr>
    `;

    document.querySelector("#results tbody")?.insertAdjacentHTML("beforeend", html);
}



async function getMembers(): Promise<RawMember[]> {
    return await (await fetch("../../../data/members.json")).json();
}

async function getResults(): Promise<RawResult[]> {
    return await (await fetch("../../../data/results.json")).json();
}

function constructResults(rawResults: RawResult[]) {
    for (const rawResult of rawResults) {
        resultsArr.push(construct.factoryResult(rawResult));
    }
}

export { membersArr, resultsArr, membersRenderArr };

import { initTabs } from "./tabs.js";
import * as construct from "./factories.js";
import { Member } from "./Member.js";
import { MemberRender } from "./MemberRender.js";
window.addEventListener("load", initApp);
const discipliner = {
    breaststroke: "Bryst",
    backstroke: "Ryg",
    freestyle: "Fristil",
    butterfly: "Sommerfugl",
};
let membersArr = [];
let membersRenderArr = [];
let resultsArr = [];
async function initApp() {
    initTabs();
    const rawMembersArr = await getMembers();
    const rawResultsArr = await getResults();
    createMemberArr(rawMembersArr);
    createMemberRenderArr(rawMembersArr);
    renderAllMembers();
    MemberRender.clear(document.querySelector("#members tbody"));
    MemberRender.sort(membersRenderArr, "name", "string", false);
    renderAllMembers();
    // constructResults(rawResultsArr);
    // sortMembers();
    // sortResults();
    // showMembers(membersArr);
    showResults(resultsArr);
}
function createMemberArr(rawMembersArr) {
    for (const rawMember of rawMembersArr) {
        const newMember = new Member(rawMember.id, rawMember.firstName, rawMember.lastName, rawMember.email, rawMember.dateOfBirth, rawMember.disciplines, rawMember.gender, rawMember.hasPayed, rawMember.image, rawMember.isActiveMember, rawMember.isCompetitive);
        membersArr.push(newMember);
    }
}
function createMemberRenderArr(rawMembersArr) {
    for (const rawMember of rawMembersArr) {
        const newMemberRender = new MemberRender(rawMember.id, rawMember.firstName, rawMember.lastName, rawMember.email, rawMember.dateOfBirth, rawMember.disciplines, rawMember.gender, rawMember.hasPayed, rawMember.image, rawMember.isActiveMember, rawMember.isCompetitive);
        membersRenderArr.push(newMemberRender);
    }
}
function renderAllMembers() {
    for (const member of membersRenderArr) {
        const container = document.querySelector("#members tbody");
        member.render(container);
        if (container.lastElementChild) {
            member.postRender(container.lastElementChild);
        }
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
function constructResults(rawResults) {
    for (const rawResult of rawResults) {
        resultsArr.push(construct.factoryResult(rawResult));
    }
}
export { membersArr, resultsArr, getDisciplinesInDanish };

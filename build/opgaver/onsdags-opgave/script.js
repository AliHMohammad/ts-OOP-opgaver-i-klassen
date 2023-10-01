import { initTabs } from "./tabs.js";
import { createMemberArr, createMemberRenderArr } from "./Member-controller.js";
import { sortFilterMembers } from "./Member-view.js";
import { createResultArr, createResultRenderArr } from "./Result-controller.js";
import { sortFilterResults } from "./Result-view.js";
window.addEventListener("load", initApp);
// const discipliner: { [key: string]: string } = {
//     breaststroke: "Bryst",
//     backstroke: "Ryg",
//     freestyle: "Fristil",
//     butterfly: "Sommerfugl",
// };
const membersArr = [];
const membersRenderArr = [];
const resultsArr = [];
const resultsRenderArr = [];
async function initApp() {
    initTabs();
    const rawMembersArr = await getMembers();
    const rawResultsArr = await getResults();
    createMemberArr(rawMembersArr);
    createMemberRenderArr(rawMembersArr);
    createResultArr(rawResultsArr);
    createResultRenderArr(rawResultsArr);
    // renderAllResults(resultsRenderArr);
    // renderAllMembers(membersRenderArr);
    // MemberRender.sort(membersRenderArr, "name", "string");
    // renderAllMembers(membersRenderArr);
    sortFilterMembers();
    sortFilterResults();
    // constructResults(rawResultsArr);
    // sortMembers();
    // sortResults();
    // showMembers(membersArr);
    // showResults(resultsArr);
    initiateEventListeners();
}
function initiateEventListeners() {
    //Members
    document.querySelector("#filter-members")?.addEventListener("change", sortFilterMembers);
    document.querySelector("#sort-members")?.addEventListener("change", sortFilterMembers);
    document.querySelector("#sort-order-members")?.addEventListener("change", sortFilterMembers);
    //Results
    document.querySelector("#filter-results")?.addEventListener("change", sortFilterResults);
    document.querySelector("#sort-results")?.addEventListener("change", sortFilterResults);
    document.querySelector("#sort-order-results")?.addEventListener("change", sortFilterResults);
}
async function getMembers() {
    return await (await fetch("../../../data/members.json")).json();
}
async function getResults() {
    return await (await fetch("../../../data/results.json")).json();
}
// function constructResults(rawResults: RawResult[]) {
//     for (const rawResult of rawResults) {
//         resultsArr.push(construct.factoryResult(rawResult));
//     }
// }
export { membersArr, resultsArr, resultsRenderArr, membersRenderArr };

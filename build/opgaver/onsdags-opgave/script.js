import { initTabs } from "./tabs.js";
import { createMemberArr, createMemberRenderArr, getMembers } from "./Member-controller.js";
import { sortFilterMembers } from "./Member-view.js";
import { createResultArr, createResultRenderArr, getResults } from "./Result-controller.js";
import { sortFilterResults } from "./Result-view.js";
window.addEventListener("load", initApp);
const membersArr = [];
const membersRenderArr = [];
const resultsArr = [];
const resultsRenderArr = [];
async function initApp() {
    initTabs();
    const rawMembersArr = await getMembers();
    const rawResultsArr = await getResults();
    createMemberArr(rawMembersArr);
    createMemberRenderArr(membersArr);
    createResultArr(rawResultsArr);
    createResultRenderArr(rawResultsArr);
    sortFilterMembers();
    sortFilterResults();
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
export { membersArr, resultsArr, resultsRenderArr, membersRenderArr };

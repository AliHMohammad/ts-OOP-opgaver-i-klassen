import { initTabs } from "./tabs.js";
import { factoryMember, factoryResult } from "./factories.js";
window.addEventListener("load", initApp);
let membersArr = [];
let resultsArr = [];
async function initApp() {
    initTabs();
    const rawMembersArr = await getMembers();
    const rawResultsArr = await getResults();
}
async function getMembers() {
    return await (await fetch("../../../data/members.json")).json();
}
async function getResults() {
    return await (await fetch("../../../data/results.json")).json();
}
function constructMembers(rawMembers) {
    for (const rawMember of rawMembers) {
        membersArr.push(factoryMember(rawMember));
    }
}
function constructResults(rawResults) {
    for (const rawResult of rawResults) {
        resultsArr.push(factoryResult(rawResult));
    }
}
export { membersArr, resultsArr };

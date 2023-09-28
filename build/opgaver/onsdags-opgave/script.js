import { initTabs } from "./tabs.js";
import * as construct from "./factories.js";
import * as listRendererConstruct from "./list-renderer.js";
import { memberRenderer } from "./member-renderer.js";
import { resultRenderer } from "./result-renderer.js";
window.addEventListener("load", initApp);
const discipliner = {
    breaststroke: "Bryst",
    backstroke: "Ryg",
    freestyle: "Fristil",
    butterfly: "Sommerfugl",
};
let membersArr = [];
let resultsArr = [];
let memberRenderResult;
let resultRenderResult;
async function initApp() {
    initTabs();
    const rawMembersArr = await getMembers();
    const rawResultsArr = await getResults();
    constructMembers(rawMembersArr);
    constructResults(rawResultsArr);
    const memberContainer = document.querySelector("#members tbody");
    memberRenderResult = listRendererConstruct.construct(membersArr, memberContainer, memberRenderer);
    memberRenderResult.render();
    const resultContainer = document.querySelector("#results tbody");
    resultRenderResult = listRendererConstruct.construct(resultsArr, resultContainer, resultRenderer);
    resultRenderResult.render();
    updateSortValue();
    initiateEventListeners();
}
function updateSortValue() {
    const sortElement = document.querySelector("#sort");
    const orderByElement = document.querySelector("#order-by");
    const sortValue = sortElement.value;
    const orderValue = orderByElement.value;
    memberRenderResult.sort(sortValue, orderValue);
    //? Har ikke taget hensyn til results når det gælder sortering og filtrering pga. den måde HTML'en er opbygget på med tabs.
    // resultRenderResult.sort(sortValue, orderValue);
}
function getDisciplinesInDanish(disciplines) {
    const danskArr = [];
    if (!disciplines) {
        return undefined;
    }
    for (const discipline of disciplines) {
        danskArr.push(discipline);
    }
    return danskArr.join(", ");
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
function initiateEventListeners() {
    document.querySelector("#sort")?.addEventListener("change", updateSortValue);
    document.querySelector("#order-by")?.addEventListener("change", updateSortValue);
    document.querySelector("#filter")?.addEventListener("change", updateSortValue);
}
export { membersArr, resultsArr, getDisciplinesInDanish, discipliner };

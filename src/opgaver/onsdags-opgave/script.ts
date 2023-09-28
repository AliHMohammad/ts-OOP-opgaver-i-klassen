import { initTabs } from "./tabs.js";
import { ConstructInter, Member, RawMember, RawResult, Result } from "./interfaces.js";
import * as construct from "./factories.js";
import * as listRendererConstruct from "./list-renderer.js"
import { memberRenderer } from "./member-renderer.js";
import { resultRenderer } from "./result-renderer.js";

window.addEventListener("load", initApp);

const discipliner: { [key: string]: string } = {
    breaststroke: "Bryst",
    backstroke: "Ryg",
    freestyle: "Fristil",
    butterfly: "Sommerfugl",
};

let membersArr: Member[] = [];
let resultsArr: Result[] = [];

let memberRenderResult: ConstructInter;
let resultRenderResult: ConstructInter;

async function initApp() {
    initTabs();
    const rawMembersArr: RawMember[] = await getMembers();
    const rawResultsArr: RawResult[] = await getResults();

    constructMembers(rawMembersArr);
    constructResults(rawResultsArr);
   
    const memberContainer = document.querySelector("#members tbody") as HTMLElement;
    memberRenderResult = listRendererConstruct.construct(membersArr, memberContainer, memberRenderer)
    memberRenderResult.render();

    const resultContainer = document.querySelector("#results tbody") as HTMLElement;
    resultRenderResult = listRendererConstruct.construct(resultsArr, resultContainer, resultRenderer);
    resultRenderResult.render();

    updateSortValue();

    initiateEventListeners()
}

function updateSortValue() {
    const sortElement = document.querySelector("#sort") as HTMLSelectElement;
    const orderByElement = document.querySelector("#order-by") as HTMLSelectElement;
    const sortValue = sortElement.value;
    const orderValue = orderByElement.value; 

    memberRenderResult.sort(sortValue, orderValue);
    //? Har ikke taget hensyn til results når det gælder sortering og filtrering pga. den måde HTML'en er opbygget på med tabs.
    // resultRenderResult.sort(sortValue, orderValue);
}

function getDisciplinesInDanish(disciplines: string[] | undefined): string | undefined {
    const danskArr: string[] = [];

    if (!disciplines) {
        return undefined;
    }

    for (const discipline of disciplines) {
        danskArr.push(discipline);
    }

    return danskArr.join(", ")
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

function initiateEventListeners() {
    document.querySelector("#sort")?.addEventListener("change", updateSortValue);
    document.querySelector("#order-by")?.addEventListener("change", updateSortValue);
    document.querySelector("#filter")?.addEventListener("change", updateSortValue);
}

export { membersArr, resultsArr, getDisciplinesInDanish, discipliner };

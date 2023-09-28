import { initTabs } from "./tabs.js";
import { Member, RawMember, RawResult, Result } from "./interfaces.js";
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

async function initApp() {
    initTabs();
    const rawMembersArr: RawMember[] = await getMembers();
    const rawResultsArr: RawResult[] = await getResults();

    constructMembers(rawMembersArr);
    constructResults(rawResultsArr);

    sortMembers();
    sortResults();

    // showMembers(membersArr);
    const memberContainer = document.querySelector("#members tbody") as HTMLElement;
    const memberRenderResult = listRendererConstruct.construct(membersArr, memberContainer, memberRenderer)
    memberRenderResult.render();

    
    // showResults(resultsArr);
    const resultContainer = document.querySelector("#results tbody") as HTMLElement;
    const resultRenderResult = listRendererConstruct.construct(resultsArr, resultContainer, resultRenderer);
    resultRenderResult.render();
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

export { membersArr, resultsArr, getDisciplinesInDanish, discipliner };

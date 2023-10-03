import { initTabs } from "./tabs.js";
import { Member, RawMember, RawResult, Result } from "./interfaces.js";
import * as factoryConstructor from "./factories.js";
import * as ListRenderer from "./ListRenderer.js"
import { MemberRenderer } from "./MemberRenderer.js";
import { ResultRenderer } from "./ResultRenderer.js";

window.addEventListener("load", initApp);



let membersArr: Member[] = [];
let resultsArr: Result[] = [];

async function initApp() {
    initTabs();
    const rawMembersArr: RawMember[] = await getMembers();
    const rawResultsArr: RawResult[] = await getResults();

    constructMembers(rawMembersArr);
    constructResults(rawResultsArr);

    const containerMember = document.querySelector("#members tbody") as HTMLElement;
    const memberList = ListRenderer.construct(membersArr, containerMember, MemberRenderer)

    const containerResult = document.querySelector("#results tbody") as HTMLElement;
    const resultList = ListRenderer.construct(resultsArr, containerResult, ResultRenderer);

    memberList.render();
    resultList.render();

    sortMembers();
    sortResults();

    // showMembers(membersArr);
    // showResults(resultsArr);
}



function getDisciplinesInDanish(disciplines: string[] | undefined): string | null {
    const danskArr: string[] = [];

    if (!disciplines) {
        return null;
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
        membersArr.push(factoryConstructor.factoryMember(rawMember));
    }
}

function constructResults(rawResults: RawResult[]) {
    for (const rawResult of rawResults) {
        resultsArr.push(factoryConstructor.factoryResult(rawResult));
    }
}

export { membersArr, resultsArr, getDisciplinesInDanish };

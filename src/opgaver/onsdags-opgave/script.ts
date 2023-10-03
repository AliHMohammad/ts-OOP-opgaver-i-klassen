import { initTabs } from "./tabs.js";
import { Member, RawMember, RawResult, Result } from "./interfaces.js";
import * as factoryConstructor from "./factories.js";
import * as ListRenderer from "./ListRenderer.js"
import { MemberRenderer } from "./MemberRenderer.js";
import { ResultRenderer } from "./ResultRenderer.js";

window.addEventListener("load", initApp);



let membersArr: Member[] = [];
let resultsArr: Result[] = [];

let memberList = [];
let resultList = [];

async function initApp() {
    initTabs();
    const rawMembersArr: RawMember[] = await getMembers();
    const rawResultsArr: RawResult[] = await getResults();

    constructMembers(rawMembersArr);
    constructResults(rawResultsArr);

    const containerMember = document.querySelector("#members tbody") as HTMLElement;
    memberList = ListRenderer.construct(membersArr, containerMember, MemberRenderer)

    const containerResult = document.querySelector("#results tbody") as HTMLElement;
    resultList = ListRenderer.construct(resultsArr, containerResult, ResultRenderer);

    memberList.render();
    resultList.render();


    // showMembers(membersArr);
    // showResults(resultsArr);

    initiateEventListeners()
}

function initiateEventListeners() {
    document.querySelector("#sort-members")?.addEventListener("change", getSortValuesMember);
    document.querySelector("#sort-order-members")?.addEventListener("change", getSortValuesMember);
    document.querySelector("#sort-results")?.addEventListener("change", getSortValuesResult);
    document.querySelector("#sort-order-results")?.addEventListener("change", getSortValuesResult);
}

function getSortValuesMember(event: Event) {
    const sortElement = document.querySelector("#sort-members") as HTMLSelectElement;
    const sortByElement = document.querySelector("#sort-order-members") as HTMLSelectElement;

    const sortValue = sortElement.value;
    const sortByValue = sortByElement.value;

    memberList.sort(sortValue, sortByValue)
}

function getSortValuesResult(event: Event) {
    const sortElement = document.querySelector("#sort-results") as HTMLSelectElement;
    const sortByElement = document.querySelector("#sort-order-results") as HTMLSelectElement;

    const sortValue = sortElement.value;
    const sortByValue = sortByElement.value;

    resultList.sort(sortValue, sortByValue);

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

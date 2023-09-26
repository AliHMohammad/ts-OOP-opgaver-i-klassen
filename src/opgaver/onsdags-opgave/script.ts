import { initTabs } from "./tabs.js";
import { Member, RawMember, RawResult, Result } from "./interfaces.js";
import { factoryMember, factoryResult } from "./factories.js";

window.addEventListener("load", initApp);

let membersArr: Member[] = []
let resultsArr: Result[] = []

async function initApp() {
    initTabs();
    const rawMembersArr: RawMember[] = await getMembers();
    const rawResultsArr: RawResult[] = await getResults();

}

async function getMembers(): Promise<RawMember[]> {
    return await (await fetch("../../../data/members.json")).json();
}

async function getResults(): Promise<RawResult[]>{
    return await (await fetch("../../../data/results.json")).json();
}

function constructMembers(rawMembers: RawMember[]) {
    for (const rawMember of rawMembers) {
        membersArr.push(factoryMember(rawMember));
    }
}

function constructResults(rawResults: RawResult[]) {
    for (const rawResult of rawResults) {
        resultsArr.push(factoryResult(rawResult));
    }
}



export {membersArr, resultsArr}
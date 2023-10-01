import { initTabs } from "./tabs.js";
import { RawMember, RawResult, Result as ResultInterface } from "./interfaces.js";
import * as construct from "./factories.js";
import { Member } from "./Member.js";
import { MemberRender } from "./MemberRender.js";
import { createMemberArr, createMemberRenderArr } from "./Member-controller.js";
import { sortFilterMembers } from "./Member-view.js";
import { Result } from "./Result.js";
import { ResultRender } from "./ResultRender.js";
import { createResultArr, createResultRenderArr } from "./Result-controller.js";
import { renderAllResults, sortFilterResults } from "./Result-view.js";

window.addEventListener("load", initApp);

// const discipliner: { [key: string]: string } = {
//     breaststroke: "Bryst",
//     backstroke: "Ryg",
//     freestyle: "Fristil",
//     butterfly: "Sommerfugl",
// };

const membersArr: Member[] = [];
const membersRenderArr: MemberRender[] = [];

const resultsArr: Result[] = [];
const resultsRenderArr: ResultRender[] = [];


async function initApp() {
    initTabs();
    const rawMembersArr: RawMember[] = await getMembers();
    const rawResultsArr: RawResult[] = await getResults();

    createMemberArr(rawMembersArr);
    createMemberRenderArr(rawMembersArr);

    createResultArr(rawResultsArr);
    createResultRenderArr(rawResultsArr);

    
    
    

    // renderAllResults(resultsRenderArr);


    // renderAllMembers(membersRenderArr);
    // MemberRender.sort(membersRenderArr, "name", "string");
    // renderAllMembers(membersRenderArr);

    sortFilterMembers()
    sortFilterResults()

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




async function getMembers(): Promise<RawMember[]> {
    return await (await fetch("../../../data/members.json")).json();
}

async function getResults(): Promise<RawResult[]> {
    return await (await fetch("../../../data/results.json")).json();
}

// function constructResults(rawResults: RawResult[]) {
//     for (const rawResult of rawResults) {
//         resultsArr.push(construct.factoryResult(rawResult));
//     }
// }

export { membersArr, resultsArr, resultsRenderArr, membersRenderArr };

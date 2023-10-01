import { initTabs } from "./tabs.js";
import { RawMember, RawResult} from "./interfaces.js";
import { Member } from "./Member.js";
import { MemberRender } from "./MemberRender.js";
import { createMemberArr, createMemberRenderArr } from "./Member-controller.js";
import { sortFilterMembers } from "./Member-view.js";
import { Result } from "./Result.js";
import { ResultRender } from "./ResultRender.js";
import { createResultArr, createResultRenderArr } from "./Result-controller.js";
import { sortFilterResults } from "./Result-view.js";

window.addEventListener("load", initApp);

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

    sortFilterMembers()
    sortFilterResults()

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


export { membersArr, resultsArr, resultsRenderArr, membersRenderArr };

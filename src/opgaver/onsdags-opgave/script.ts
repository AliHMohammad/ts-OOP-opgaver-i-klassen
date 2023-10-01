import { initTabs } from "./tabs.js";
import { Member as MemberInterface, RawMember, RawResult, Result } from "./interfaces.js";
import * as construct from "./factories.js";
import { Member } from "./Member.js";
import { MemberRender } from "./MemberRender.js";

window.addEventListener("load", initApp);

const discipliner: { [key: string]: string } = {
    breaststroke: "Bryst",
    backstroke: "Ryg",
    freestyle: "Fristil",
    butterfly: "Sommerfugl",
};

let membersArr: Member[] = [];
let membersRenderArr: MemberRender[] = [];
let resultsArr: Result[] = [];

async function initApp() {
    initTabs();
    const rawMembersArr: RawMember[] = await getMembers();
    const rawResultsArr: RawResult[] = await getResults();

    createMemberArr(rawMembersArr);
    createMemberRenderArr(rawMembersArr);

    // renderAllMembers(membersRenderArr);
    // MemberRender.sort(membersRenderArr, "name", "string");
    // renderAllMembers(membersRenderArr);

    sortFilterMembers()

    // constructResults(rawResultsArr);

    // sortMembers();
    // sortResults();

    // showMembers(membersArr);

    // showResults(resultsArr);
    initiateEventListeners();
}

function initiateEventListeners() {
    document.querySelector("#filter-members")?.addEventListener("change", sortFilterMembers);
    document.querySelector("#sort-members")?.addEventListener("change", sortFilterMembers);
    document.querySelector("#sort-order-members")?.addEventListener("change", sortFilterMembers);
}

function sortFilterMembers() {
    //HTML elements
    const filterElement = document.querySelector("#filter-members") as HTMLSelectElement;
    const sortElement = document.querySelector("#sort-members") as HTMLSelectElement;

    //FILTER
    const filterValue = filterElement.value;
    console.log(filterValue);
    
    const filteredmembers = MemberRender.filter(membersRenderArr, filterValue);
        
    
    console.log(filteredmembers);
    

    //SORT
    const sortByElement = document.querySelector("#sort-order-members") as HTMLSelectElement;
    const sortValue = sortElement.value as keyof Member;
    const sortByValue = sortByElement.value;
    let sortDataType = "string";

    if (sortValue === "age") {
        sortDataType = "number";
    } else if (sortValue === "dateOfBirth") {
        sortDataType = "date"
    }

    MemberRender.sort(filteredmembers, sortValue, sortDataType)

    if (sortByValue === "DESC") {
        filteredmembers.reverse();
    }

    renderAllMembers(filteredmembers)
}

function createMemberArr(rawMembersArr: RawMember[]) {
    for (const rawMember of rawMembersArr) {
        const newMember = new Member(
            rawMember.id,
            rawMember.firstName,
            rawMember.lastName,
            rawMember.email,
            rawMember.dateOfBirth,
            rawMember.disciplines,
            rawMember.gender,
            rawMember.hasPayed,
            rawMember.image,
            rawMember.isActiveMember,
            rawMember.isCompetitive
        );

        membersArr.push(newMember);
    }
}

function createMemberRenderArr(rawMembersArr: RawMember[]) {
    for (const rawMember of rawMembersArr) {
        const newMemberRender = new MemberRender(
            rawMember.id,
            rawMember.firstName,
            rawMember.lastName,
            rawMember.email,
            rawMember.dateOfBirth,
            rawMember.disciplines,
            rawMember.gender,
            rawMember.hasPayed,
            rawMember.image,
            rawMember.isActiveMember,
            rawMember.isCompetitive
        );

        membersRenderArr.push(newMemberRender);
    }
}

function renderAllMembers(members: MemberRender[]) {
    MemberRender.clear(document.querySelector("#members tbody") as HTMLElement);
    for (const member of members) {
        const container = document.querySelector("#members tbody") as HTMLElement;
        const html = member.render();
        container.insertAdjacentHTML("beforeend", html)

        if (container.lastElementChild) {
            member.postRender(container.lastElementChild as HTMLElement);
        }
    }
}

function showResults(results: Result[]) {
    for (const result of results) {
        showResult(result);
    }
}

function showResult(result: Result) {
    const html = /*html*/ `
    <tr>
        <td>${result.dateToString}</td>
        <td>${result.member ? result.member.name : "Ukendt"}</td>
        <td>${discipliner[`${result.discipline}`]}</td>
        <td>${result.resultType === "competition" ? "Kompetitiv" : "Træning"}</td>
        <td>${result.timeToString}</td>
    </tr>
    `;

    document.querySelector("#results tbody")?.insertAdjacentHTML("beforeend", html);
}

function getDisciplinesInDanish(disciplines: string[] | undefined): string | null {
    const danskArr: string[] = [];

    if (!disciplines) {
        return null;
    }

    for (const discipline of disciplines) {
        danskArr.push(discipline);
    }

    return danskArr.join(", ");
}

async function getMembers(): Promise<RawMember[]> {
    return await (await fetch("../../../data/members.json")).json();
}

async function getResults(): Promise<RawResult[]> {
    return await (await fetch("../../../data/results.json")).json();
}

function constructResults(rawResults: RawResult[]) {
    for (const rawResult of rawResults) {
        resultsArr.push(construct.factoryResult(rawResult));
    }
}

export { membersArr, resultsArr, getDisciplinesInDanish };

import { membersArr, membersRenderArr } from "./script.js";
import { Member } from "./Member.js";
import { MemberRender } from "./MemberRender.js";
import { RawMember } from "./interfaces";

async function getMembers(): Promise<RawMember[]> {
    return await (await fetch("../../../data/members.json")).json();
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

function createMemberRenderArr(members: Member[]) {
    for (const member of members) {
        const newMemberRender = new MemberRender(member);

        membersRenderArr.push(newMemberRender);
    }
}

export { createMemberArr, createMemberRenderArr, getMembers };

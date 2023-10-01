import { membersArr, membersRenderArr } from "./script.js";
import { Member } from "./Member.js";
import { MemberRender } from "./MemberRender.js";
import { RawMember } from "./interfaces";

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

export {createMemberArr, createMemberRenderArr}
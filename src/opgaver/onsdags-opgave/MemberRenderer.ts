import { getDisciplinesInDanish } from "./script.js";
import { Member } from "./interfaces.js";

const MemberRenderer = {
    render(member: Member): string {
        const danskDiscipliner = getDisciplinesInDanish(member.disciplines);

        const html = /*html*/ `
                <tr>
                    <td>${member.name}</td>
                    <td>${member.isActiveMember ? "Ja" : "Nej"}</td>
                    <td>${member.dateOfBirthToString}</td>
                    <td>${member.age}</td>
                    <td>${danskDiscipliner ? danskDiscipliner : "Ingen"}</td>
                </tr>
                `;
        
        return html;
    }
}

export {MemberRenderer}
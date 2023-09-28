import { getDisciplinesInDanish } from "./script.js";
const memberRenderer = {
    render(member) {
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
    },
};
export { memberRenderer };

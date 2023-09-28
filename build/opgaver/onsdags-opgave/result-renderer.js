import { discipliner } from "./script.js";
const resultRenderer = {
    render(result) {
        const html = /*html*/ `
        <tr>
            <td>${result.dateToString}</td>
            <td>${result.member ? result.member.name : "Ukendt"}</td>
            <td>${discipliner[`${result.discipline}`]}</td>
            <td>${result.resultType === "competition" ? "Kompetitiv" : "Træning"}</td>
            <td>${result.timeToString}</td>
        </tr>
        `;
        return html;
    },
};
export { resultRenderer };

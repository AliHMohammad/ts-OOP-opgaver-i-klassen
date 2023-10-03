const discipliner = {
    breaststroke: "Bryst",
    backstroke: "Ryg",
    freestyle: "Fristil",
    butterfly: "Sommerfugl",
};
const ResultRenderer = {
    render(result) {
        return /*html*/ `
        <tr>
            <td>${result.dateToString}</td>
            <td>${result.member ? result.member.name : "Ukendt"}</td>
            <td>${discipliner[`${result.discipline}`]}</td>
            <td>${result.resultType === "competition" ? "Kompetitiv" : "Træning"}</td>
            <td>${result.timeToString}</td>
        </tr>
        `;
    }
};
export { ResultRenderer };

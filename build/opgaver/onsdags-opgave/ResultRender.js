import { Result } from "./Result.js";
import { discipliner } from "./Result-view.js";
export class ResultRender extends Result {
    render() {
        return /*html*/ `
        <tr>
            <td>${this.dateToString}</td>
            <td class="member">${this.member ? this.member.name : "Ukendt"}</td>
            <td>${discipliner[`${this.discipline}`]}</td>
            <td class="resultType">${this.resultType === "competition" ? "Kompetitiv" : "Træning"}</td>
            <td class="time" style="text-align: center;" >${this.timeToString}</td>
        </tr>
        `;
    }
    postRender(containerLastChild) {
        containerLastChild.querySelector(".member")?.addEventListener("click", () => {
            console.log(this.member);
        });
        containerLastChild.querySelector(".resultType")?.addEventListener("click", () => {
            console.log(this.resultType);
        });
        containerLastChild.querySelector(".time")?.addEventListener("click", () => {
            console.log(this.time);
        });
    }
    static clear(element) {
        element.innerHTML = "";
    }
    static filter(resultsArr, filterValue) {
        let result = [];
        if (filterValue === "competition") {
            result = resultsArr.filter((result) => result.isCompetition());
        }
        else if (filterValue === "training") {
            result = resultsArr.filter((result) => result.isTraining());
        }
        return result;
    }
    static sort(resultsArr, property, dataType) {
        if (dataType === "string") {
            this.sortByString(resultsArr, property);
        }
        else if (dataType === "number") {
            this.sortByNumber(resultsArr, property);
        }
        else if (dataType === "date") {
            this.sortByDate(resultsArr, property);
        }
    }
    static sortByDate(memberArr, property) {
        memberArr.sort((a, b) => new Date(a[property]).getTime() - new Date(b[property]).getTime());
    }
    static sortByNumber(memberArr, property) {
        console.log("sort number");
        memberArr.sort((a, b) => a[property] - b[property]);
    }
    static sortByString(memberArr, property) {
        console.log("sort string");
        memberArr.sort((a, b) => a[property].localeCompare(b[property]));
    }
}

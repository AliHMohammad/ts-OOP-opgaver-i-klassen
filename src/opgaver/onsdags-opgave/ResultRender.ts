import { Result } from "./Result.js";
import { Render } from "./interfaces";
import { discipliner } from "./Result-view.js";

export class ResultRender extends Result implements Render {
    render(): string {
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

    postRender(containerLastChild: HTMLElement): void {
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

    static clear(element: HTMLElement): void {
        element.innerHTML = "";
    }

    static filter(resultsArr: ResultRender[], filterValue: string): ResultRender[] {
        let result: ResultRender[] = [];

        if (filterValue === "competition") {
            result = resultsArr.filter((result) => result.isCompetition());
        } else if (filterValue === "training") {
            result = resultsArr.filter((result) => result.isTraining());
        }

        return result;
    }

    static sort(resultsArr: ResultRender[], property: keyof Result, dataType: string): void {
        if (dataType === "string") {
            this.sortByString(resultsArr, property);
        } else if (dataType === "number") {
            this.sortByNumber(resultsArr, property);
        } else if (dataType === "date") {
            this.sortByDate(resultsArr, property);
        } 
    }

    private static sortByDate(memberArr: Result[], property: keyof Result): void {
        memberArr.sort((a: Result, b: Result) => new Date(a[property] as Date).getTime() - new Date(b[property] as Date).getTime());
    }

    private static sortByNumber(memberArr: Result[], property: keyof Result): void {
        console.log("sort number");
        memberArr.sort((a: Result, b: Result) => (a[property] as number) - (b[property] as number));
    }

    private static sortByString(memberArr: Result[], property: keyof Result): void {
        console.log("sort string");

        memberArr.sort((a: Result, b: Result) => (a[property] as string).localeCompare(b[property] as string));
    }
}
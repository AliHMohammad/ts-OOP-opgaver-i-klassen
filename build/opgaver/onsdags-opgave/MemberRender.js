import { Member } from "./Member.js";
import { getDisciplinesInDanish } from "./script.js";
export class MemberRender extends Member {
    constructor(id, firstName, lastName, email, dateOfBirth, disciplines, gender, hasPayed, image, isActiveMember, isCompetitive) {
        super(id, firstName, lastName, email, dateOfBirth, disciplines, gender, hasPayed, image, isActiveMember, isCompetitive);
    }
    render(container) {
        const danskDiscipliner = getDisciplinesInDanish(this._disciplines);
        const html = /*html*/ `
        <tr>
            <td class="name">${this.name}</td>
            <td>${this._isActiveMember ? "Ja" : "Nej"}</td>
            <td>${this.dateOfBirthToString}</td>
            <td class="age">${this.age}</td>
            <td>${danskDiscipliner ? danskDiscipliner : "Ingen"}</td>
            <td><button>Delete</button></td>
        </tr>
        `;
        container.insertAdjacentHTML("beforeend", html);
    }
    postRender(containerLastChild) {
        containerLastChild.querySelector(".name")?.addEventListener("click", () => {
            console.log(this.name);
        });
        containerLastChild.querySelector(".age")?.addEventListener("click", () => {
            console.log(this.age);
        });
        containerLastChild.querySelector("button")?.addEventListener("click", () => {
            console.log(`Deleting..`);
            console.log(this.name);
        });
        containerLastChild.querySelector("button")?.addEventListener("click", () => {
            console.log("DELETING...");
            console.log(this);
        });
    }
    static sort(memberArr, property, dataType, isReverse) {
        if (dataType === "string") {
            this.sortByString(memberArr, property);
            isReverse === true ? memberArr.reverse() : "";
        }
        else if (dataType === "number") {
        }
        else if (dataType === "date") {
        }
    }
    static clear(container) {
        container.innerHTML = "";
    }
    // private sortByDate() {}
    // private sortByNumber() {
    //     memberArr.sort((a, b) => a[`${property}`] - b[`${property}`]);
    // }
    static sortByString(memberArr, property) {
        console.log("sort name");
        memberArr.sort((a, b) => a[property].localeCompare(b[property]));
    }
}

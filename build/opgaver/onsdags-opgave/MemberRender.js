import { Member } from "./Member.js";
import { getDisciplinesInDanish } from "./Member-view.js";
export class MemberRender extends Member {
    // constructor(data: RawMember) {
    //     super(data.id, data.firstName, data.lastName, data.email, data.dateOfBirth, data.disciplines, data.gender, data.hasPayed, data.image, data.isActiveMember, data.isCompetitive);
    // }
    render() {
        const danskDiscipliner = getDisciplinesInDanish(this._disciplines);
        return /*html*/ `
        <tr>
            <td class="name">${this.name}</td>
            <td>${this._isActiveMember ? "Ja" : "Nej"}</td>
            <td>${this.dateOfBirthToString}</td>
            <td class="age">${this.age}</td>
            <td>${danskDiscipliner ? danskDiscipliner : "Ingen"}</td>
            <td><button>Delete</button></td>
        </tr>
        `;
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
    static sort(memberArr, property, dataType) {
        if (dataType === "string") {
            this.sortByString(memberArr, property);
        }
        else if (dataType === "number") {
            this.sortByNumber(memberArr, property);
        }
        else if (dataType === "date") {
            this.sortByDate(memberArr, property);
        }
    }
    static filter(memberArr, property) {
        let result = [];
        if (property === "isActiveMember") {
            result = memberArr.filter((member) => member.isActiveMember === true);
        }
        else if (property === "!isActiveMember") {
            result = memberArr.filter((member) => member.isActiveMember === false);
        }
        else if (property === "senior") {
            result = memberArr.filter((member) => member.isSenior());
        }
        else if (property === "junior") {
            result = memberArr.filter((member) => member.isJunior());
        }
        return result;
    }
    static clear(container) {
        container.innerHTML = "";
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

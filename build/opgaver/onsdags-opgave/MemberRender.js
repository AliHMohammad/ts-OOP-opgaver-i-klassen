import { getDisciplinesInDanish } from "./Member-view.js";
import { ListRenderer } from "./ListRenderer.js";
export class MemberRender extends ListRenderer {
    _member;
    constructor(member) {
        super();
        this._member = member;
    }
    render() {
        const danskDiscipliner = getDisciplinesInDanish(this._member._disciplines);
        return /*html*/ `
        <tr>
            <td class="name">${this._member.name}</td>
            <td>${this._member._isActiveMember ? "Ja" : "Nej"}</td>
            <td>${this._member.dateOfBirthToString}</td>
            <td class="age">${this._member.age}</td>
            <td>${danskDiscipliner ? danskDiscipliner : "Ingen"}</td>
            <td><button>Delete</button></td>
        </tr>
        `;
    }
    postRender(containerLastChild) {
        containerLastChild.querySelector(".name")?.addEventListener("click", () => {
            console.log(this._member.name);
        });
        containerLastChild.querySelector(".age")?.addEventListener("click", () => {
            console.log(this._member.age);
        });
        containerLastChild.querySelector("button")?.addEventListener("click", () => {
            console.log(`Deleting..`);
            console.log(this._member.name);
        });
        containerLastChild.querySelector("button")?.addEventListener("click", () => {
            console.log("DELETING...");
            console.log(this._member);
        });
    }
}

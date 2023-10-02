import { getDisciplinesInDanish } from "./Member-view.js";
import { ListRenderer } from "./ListRenderer.js";
export class MemberRender extends ListRenderer {
    _item;
    constructor(member) {
        super();
        this._item = member;
    }
    render() {
        const danskDiscipliner = getDisciplinesInDanish(this._item._disciplines);
        return /*html*/ `
        <tr>
            <td class="name">${this._item.name}</td>
            <td>${this._item._isActiveMember ? "Ja" : "Nej"}</td>
            <td>${this._item.dateOfBirthToString}</td>
            <td class="age">${this._item.age}</td>
            <td>${danskDiscipliner ? danskDiscipliner : "Ingen"}</td>
            <td><button>Delete</button></td>
        </tr>
        `;
    }
    postRender(containerLastChild) {
        containerLastChild.querySelector(".name")?.addEventListener("click", () => {
            console.log(this._item.name);
        });
        containerLastChild.querySelector(".age")?.addEventListener("click", () => {
            console.log(this._item.age);
        });
        containerLastChild.querySelector("button")?.addEventListener("click", () => {
            console.log(`Deleting..`);
            console.log(this._item.name);
        });
        containerLastChild.querySelector("button")?.addEventListener("click", () => {
            console.log("DELETING...");
            console.log(this._item);
        });
    }
}

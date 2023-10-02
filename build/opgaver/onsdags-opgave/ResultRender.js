import { discipliner } from "./Result-view.js";
import { ListRenderer } from "./ListRenderer.js";
export class ResultRender extends ListRenderer {
    _item;
    constructor(result) {
        super();
        this._item = result;
    }
    render() {
        return /*html*/ `
        <tr>
            <td>${this._item.dateToString}</td>
            <td class="member">${this._item.member ? this._item.member.name : "Ukendt"}</td>
            <td>${discipliner[`${this._item.discipline}`]}</td>
            <td class="resultType">${this._item.resultType === "competition" ? "Kompetitiv" : "Træning"}</td>
            <td class="time" style="text-align: center;" >${this._item.timeToString}</td>
        </tr>
        `;
    }
    postRender(containerLastChild) {
        containerLastChild.querySelector(".member")?.addEventListener("click", () => {
            console.log(this._item.member);
        });
        containerLastChild.querySelector(".resultType")?.addEventListener("click", () => {
            console.log(this._item.resultType);
        });
        containerLastChild.querySelector(".time")?.addEventListener("click", () => {
            console.log(this._item.time);
        });
    }
}

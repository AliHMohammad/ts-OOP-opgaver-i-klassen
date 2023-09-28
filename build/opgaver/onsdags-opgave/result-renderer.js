import { discipliner } from "./script.js";
const resultRenderer = {
    _item: undefined,
    render() {
        if (this._item) {
            // @ts-ignore
            const result = this._item;
            const html = /*html*/ `
            <tr>
                <td>${result.dateToString}</td>
                <td>${result.member ? result.member.name : "Ukendt"}</td>
                <td>${discipliner[`${result.discipline}`]}</td>
                <td>${result.resultType === "competition" ? "Kompetitiv" : "Træning"}</td>
                <td>${result.timeToString}</td>
                <td><button>Delete</button></td>
            </tr>
            `;
            return html;
        }
        return "";
    },
    postRender(element) {
        // console.log(element);
        element.querySelector("td")?.addEventListener("click", () => {
            console.log(this.item);
        });
        element.querySelector("button")?.addEventListener("click", () => {
            console.log(`Deleting...`);
            console.log(this.item);
        });
    },
    set item(newItem) {
        if (newItem) {
            this._item = newItem;
        }
    },
    get item() {
        // @ts-ignore
        return this._item;
    }
};
export { resultRenderer };

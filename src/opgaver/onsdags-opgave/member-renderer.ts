import { Member, Render } from "./interfaces";
import { getDisciplinesInDanish } from "./script.js";

const memberRenderer: Render = {
    _item: undefined,

    render() {

        if (this._item) {
            // @ts-ignore
            const member: Member = this._item;

            const danskDiscipliner = getDisciplinesInDanish(member.disciplines);

            const html = /*html*/ `
            <tr>
                <td id="name">${member.name}</td>
                <td>${member.isActiveMember ? "Ja" : "Nej"}</td>
                <td>${member.dateOfBirthToString}</td>
                <td>${member.age}</td>
                <td>${danskDiscipliner ? danskDiscipliner : "Ingen"}</td>
                <td><button>Delete</button></td>
            </tr>
            `;

            return html;
        }

        
        return ""
    },

    postRender(element) {
        // console.log(element);
        
        element.querySelector("#name")?.addEventListener("click", () => {
            console.log(this.item);
        })

        element.querySelector("button")?.addEventListener("click", () => {
            console.log(`Deleting..`);
            console.log(this.item);
        })
            
    },

    set item(newItem: Member) {
        if (newItem) {
            this._item = newItem
        }
    },

    get item() {
        // @ts-ignore
        return this._item;
    },

    

};

export { memberRenderer };

import { Member } from "./Member.js";
import { RawMember, Render, StaticRender } from "./interfaces.js";
import { getDisciplinesInDanish } from "./script.js";

export class MemberRender extends Member implements Render {
    // constructor(data: RawMember) {
    //     super(data.id, data.firstName, data.lastName, data.email, data.dateOfBirth, data.disciplines, data.gender, data.hasPayed, data.image, data.isActiveMember, data.isCompetitive);
    // }

    render(container: HTMLElement): void {
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

    postRender(containerLastChild: HTMLElement): void {
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

    static sort(memberArr: Member[], property: keyof Member, dataType: string, isReverse: boolean): void {
        if (dataType === "string") {
            this.sortByString(memberArr, property);
            isReverse === true ? memberArr.reverse() : "";
        } else if (dataType === "number") {
        } else if (dataType === "date") {
        }
    }

    static clear(container: HTMLElement): void {
        container.innerHTML = "";
    }

    // private sortByDate() {}

    // private sortByNumber() {
    //     memberArr.sort((a, b) => a[`${property}`] - b[`${property}`]);
    // }

    private static sortByString(memberArr: Member[], property: keyof Member): void {
        console.log("sort name");

        memberArr.sort((a: Member, b: Member) => (a[property] as string).localeCompare(b[property] as string));
    }
}

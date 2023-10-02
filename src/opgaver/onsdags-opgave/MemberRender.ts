
import { RawMember, Render, StaticRender } from "./interfaces.js";
import { getDisciplinesInDanish } from "./Member-view.js";
import { ListRenderer } from "./ListRenderer.js";
import { Member } from "./Member.js";

export class MemberRender extends ListRenderer implements Render {
    _member: Member;

    constructor(member: Member) {
        super();
        this._member = member;
    }

    render(): string {
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

    postRender(containerLastChild: HTMLElement): void {
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

    // static sort(memberArr: MemberRender[], property: keyof Member, dataType: string): void {
    //     if (dataType === "string") {
    //         this.sortByString(memberArr, property);
    //     } else if (dataType === "number") {
    //         this.sortByNumber(memberArr, property);
    //     } else if (dataType === "date") {
    //         this.sortByDate(memberArr, property);
    //     }
    // }

    // private static sortByDate(memberArr: Member[], property: keyof Member): void {
    //     memberArr.sort((a: Member, b: Member) => new Date(a[property] as Date).getTime() - new Date(b[property] as Date).getTime());
    // }

    // private static sortByNumber(memberArr: Member[], property: keyof Member): void {
    //     console.log("sort number");
    //     memberArr.sort((a: Member, b: Member) => (a[property] as number) - (b[property] as number));
    // }

    // private static sortByString(memberArr: Member[], property: keyof Member): void {
    //     console.log("sort string");

    //     memberArr.sort((a: Member, b: Member) => (a[property] as string).localeCompare(b[property] as string));
    // }

    // static filter(memberArr: MemberRender[], property: string): MemberRender[] {
    //     let result: MemberRender[] = []

    //     if (property === "isActiveMember") {
    //         result = memberArr.filter((member) => member.isActiveMember === true);
    //     } else if (property === "!isActiveMember") {
    //         result = memberArr.filter((member) => member.isActiveMember === false);
    //     } else if (property === "senior") {
    //         result = memberArr.filter((member) => member.isSenior());
    //     } else if (property === "junior") {
    //         result = memberArr.filter((member) => member.isJunior());
    //     }

    //     return result
    // }

    // static clear(container: HTMLElement): void {
    //     container.innerHTML = "";
    // }
}

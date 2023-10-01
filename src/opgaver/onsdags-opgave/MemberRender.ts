import { Member } from "./Member.js";
import { RawMember, Render, StaticRender } from "./interfaces.js";
import { getDisciplinesInDanish } from "./Member-view.js";

export class MemberRender extends Member implements Render {
    // constructor(data: RawMember) {
    //     super(data.id, data.firstName, data.lastName, data.email, data.dateOfBirth, data.disciplines, data.gender, data.hasPayed, data.image, data.isActiveMember, data.isCompetitive);
    // }

    render(): string {
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

    static sort(memberArr: Member[], property: keyof Member, dataType: string): void {
        if (dataType === "string") {
            this.sortByString(memberArr, property);
        } else if (dataType === "number") {
            this.sortByNumber(memberArr, property);
        } else if (dataType === "date") {
            this.sortByDate(memberArr, property);
        }

        
    }

    static filter(memberArr: MemberRender[], property: string): MemberRender[] {
        let result: MemberRender[] = []

        if (property === "isActiveMember") {
            result = memberArr.filter((member) => member.isActiveMember === true);
        } else if (property === "!isActiveMember") {
            result = memberArr.filter((member) => member.isActiveMember === false);
        } else if (property === "senior") {
            result = memberArr.filter((member) => member.isSenior());
        } else if (property === "junior") {
            result = memberArr.filter((member) => member.isJunior());
        }

        return result
    }

    static clear(container: HTMLElement): void {
        container.innerHTML = "";
    }

    private static sortByDate(memberArr: Member[], property: keyof Member): void {
        memberArr.sort((a: Member, b: Member) => new Date(a[property] as Date).getTime() - new Date(b[property] as Date).getTime());
    }

    private static sortByNumber(memberArr: Member[], property: keyof Member): void {
        console.log("sort number");
        memberArr.sort((a: Member, b: Member) => (a[property] as number) - (b[property] as number));
    }

    private static sortByString(memberArr: Member[], property: keyof Member): void {
        console.log("sort string");

        memberArr.sort((a: Member, b: Member) => (a[property] as string).localeCompare(b[property] as string));
    }
}

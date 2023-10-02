import { Member } from "./Member.js";
import { MemberRender } from "./MemberRender.js";
import { Result } from "./Result.js";
import { ResultRender } from "./ResultRender.js";

export abstract class ListRenderer {
    render() {}

    postRender(container: HTMLElement) {}

    static clear(container: HTMLElement) {
        container.innerHTML = "";
    }

    static sort(listOfItems: MemberRender[], property: keyof Member, dataType: string): void {
        if (dataType === "string") {
            this.sortByString(listOfItems, property);
        } else if (dataType === "number") {
            this.sortByNumber(listOfItems, property);
        } else if (dataType === "date") {
            this.sortByDate(listOfItems, property);
        }
    }

    private static sortByDate(listOfItems: MemberRender[], property: keyof Member): void {
        listOfItems.sort((a: MemberRender, b: MemberRender) => new Date(a._item[property] as Date).getTime() - new Date(b._item[property] as Date).getTime());
    }

    private static sortByNumber(listOfItems: MemberRender[], property: keyof Member): void {
        console.log("sort number");
        listOfItems.sort((a: MemberRender, b: MemberRender) => (a._item[property] as number) - (b._item[property] as number));
    }

    private static sortByString(listOfItems: MemberRender[], property: keyof Member): void {
        console.log("sort string");

        listOfItems.sort((a: MemberRender, b: MemberRender) => (a._item[property] as string).localeCompare(b._item[property] as string));
    }

    static filter(listOfItems: MemberRender[], property: string): MemberRender[] {
        let result: MemberRender[] = [];

        if (property === "isActiveMember") {
            result = listOfItems.filter((index) => index._item.isActiveMember === true);
        } else if (property === "!isActiveMember") {
            result = listOfItems.filter((index) => index._item.isActiveMember === false);
        } else if (property === "senior") {
            result = listOfItems.filter((index) => index._item.isSenior());
        } else if (property === "junior") {
            result = listOfItems.filter((index) => index._item.isJunior());
        } else if (property === "competition") {
            result = listOfItems.filter((index) => index._item.isCompetition());
        } else if (property === "training") {
            result = listOfItems.filter((index) => index._item.isTraining());
        }

        return result;
    }
}

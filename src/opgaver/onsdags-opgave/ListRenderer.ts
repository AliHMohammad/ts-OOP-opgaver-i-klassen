import { Member } from "./Member.js";
import { MemberRender } from "./MemberRender.js";
import { ResultRender } from "./ResultRender.js";


export abstract class ListRenderer {
    static render(items: MemberRender[] | ResultRender[], container: HTMLElement) {
        container.innerHTML = "";

        for (const item of items) {
            const html = item.render();

            container.insertAdjacentHTML("beforeend", html);

            if (container.lastElementChild) {
                item.postRender(container.lastElementChild as HTMLElement);
            }
        }
    }

    render() {}

    postRender(container: HTMLElement) {}

    static sort(listOfItems: any[], property: string, dataType: string): void {
        if (dataType === "string") {
            listOfItems.sort((a: MemberRender, b: MemberRender) => (a._item[property] as string).localeCompare(b._item[property] as string));
        } else if (dataType === "number") {
            listOfItems.sort((a: MemberRender, b: MemberRender) => (a._item[property] as number) - (b._item[property] as number));
        } else if (dataType === "date") {
            listOfItems.sort((a: MemberRender, b: MemberRender) => new Date(a._item[property] as Date).getTime() - new Date(b._item[property] as Date).getTime());
        }
    }

    static filter(listOfItems: any[], property: string): any[] {
        let result: any[] = [];

        if (property === "none") {
            return listOfItems;
        }

        if (property.includes(":")) {
            let [key, value] = property.split(":");

            if (value === "true" || value === "false") {
                value = JSON.parse(value);
            }

            return listOfItems.filter((index) => index._item[key] == value);
        }

        if (property === "senior") {
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

import { Member } from "./Member.js";
import { membersArr } from "./script.js";

export class Result {
    _id: string;
    _memberId: string;
    _competitionLocation: string;
    _competitionName: string;
    _competitionPlacement: number;
    _date: Date;
    _discipline: string;
    _resultType: string;
    _time: number;
    _member: Member | undefined;


    constructor(
        id: string,
        memberId: string,
        competitionLocation: string,
        competitionName: string,
        competitionPlacement: number,
        date: string,
        discipline: string,
        resultType: string,
        time: string
    ) {
        this._id = id;
        this._memberId = memberId;
        this._competitionLocation = competitionLocation;
        this._competitionName = competitionName;
        this._competitionPlacement = competitionPlacement;
        this._date = new Date(date);
        this._discipline = discipline;
        this._resultType = resultType;
        this.member = memberId;
        this._time = this.initTime(time);
    }

    set time(newTime: string) {
        try {
            if (!newTime.includes(":") || !newTime.includes(".")) {
                throw new Error("Wrong format");
            }

            const [minutes, secondsAndMiliSec] = newTime.split(":");
            const [seconds, milliSeconds] = secondsAndMiliSec.split(".");
            const time = Number(minutes) * 60000 + Number(seconds) * 1000 + Number(milliSeconds);
            this._time = time;
        } catch (error) {
            console.log(error);
        }
    }

    private initTime(newTime: string) {
        try {
            if (!newTime.includes(":") || !newTime.includes(".")) {
                throw new Error("Wrong format");
            }

            const [minutes, secondsAndMiliSec] = newTime.split(":");
            const [seconds, milliSeconds] = secondsAndMiliSec.split(".");
            const time = Number(minutes) * 60000 + Number(seconds) * 1000 + Number(milliSeconds);
            return time
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    get timeToString(): string {
        if (this._time) {
            const totalSeconds = Math.floor(this._time / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            const millisecondsPart = (this._time % 1000).toString().padStart(3, "0");

            return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${millisecondsPart}`;
        } else {
            return "time on object is undefined.";
        }
    }

    get time(): number {
        if (this._time) {
            return this._time;
        } else {
            return 0;
        }
    }

    get member(): Member | undefined {
        return this._member;
    }

    set member(memberId: string) {
        const memberFound = membersArr.find((member) => member._id === memberId);

        if (!memberFound) {
            console.error("Error at set member(). Could not attach member");
            this._member = undefined;
        } else {
            this._member = memberFound;
        }
    }

    get date(): Date {
        return this._date;
    }

    get dateToString(): string {
        const date = new Intl.DateTimeFormat("da-DK", { year: "numeric", month: "long", day: "numeric" }).format(this._date);
        return date;
    }

    get discipline(): string {
        return this._discipline;
    }

    get resultType(): string {
        return this._resultType;
    }

    isTraining(): boolean {
        return this._resultType === "training";
    }

    isCompetition(): boolean {
        return this._resultType === "competition";
    }
}

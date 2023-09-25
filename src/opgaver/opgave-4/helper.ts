export interface Result {
    id: string;
    date: Date;
    discipline: string;
    type: undefined | string;
    time: string;

    getTime(): number;

    getDate(): string;
}

export interface Raw {
    id: string;
    competitionLocation?: string;
    competitionName?: string;
    competitionPlacement?: number;
    date: string;
    discipline: string;
    memberId: string;
    resultType: string;
    time: string;
}

function factoryFunction(raw: Raw): Result {
    const newResult: Result = {
        id: raw.id,
        date: new Date(raw.date),
        discipline: raw.discipline,
        type: undefined,
        time: raw.time,

        getTime(): number {
            const [minutes, secondsAndMiliSec] = this.time.split(":");
            const [seconds, milliSeconds] = secondsAndMiliSec.split(".");
            const time = Number(minutes) * 60000 + Number(seconds) * 1000 + Number(milliSeconds);
            return time;
        },

        getDate(): string {
            const formattedDate = new Intl.DateTimeFormat("da-DK", { year: "numeric", month: "long", day: "numeric" }).format(this.date);
            return formattedDate;
        },
    };

    if (raw.competitionName) {
        newResult.type = "Træning";
    } else {
        newResult.type = "Stævne";
    }

    return newResult;
}

export { factoryFunction };

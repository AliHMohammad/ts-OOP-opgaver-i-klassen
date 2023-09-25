function factoryFunction(raw) {
    const newResult = {
        id: raw.id,
        date: new Date(raw.date),
        discipline: raw.discipline,
        type: undefined,
        time: raw.time,
        getTime() {
            const [minutes, secondsAndMiliSec] = this.time.split(":");
            const [seconds, milliSeconds] = secondsAndMiliSec.split(".");
            const time = Number(minutes) * 60000 + Number(seconds) * 1000 + Number(milliSeconds);
            return time;
        },
        getDate() {
            const formattedDate = new Intl.DateTimeFormat("da-DK", { year: "numeric", month: "long", day: "numeric" }).format(this.date);
            return formattedDate;
        },
    };
    if (raw.competitionName) {
        newResult.type = "Træning";
    }
    else {
        newResult.type = "Stævne";
    }
    return newResult;
}
export { factoryFunction };

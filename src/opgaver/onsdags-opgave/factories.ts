import { Member, Result, RawMember, RawResult } from "./interfaces";
import { membersArr } from "./script.js";

function factoryMember(rawMember: RawMember): Member {
    const newMember: Member = {
        _id: rawMember.id,
        _firstName: rawMember.firstName,
        _lastName: rawMember.lastName,
        _email: rawMember.email,
        _dateOfBirth: new Date(rawMember.dateOfBirth),
        _disciplines: rawMember.disciplines,
        _gender: rawMember.gender,
        _hasPayed: rawMember.hasPayed,
        _image: rawMember.image,
        _isActiveMember: rawMember.isActiveMember,
        _isCompetitive: rawMember.isCompetitive,

        set dateOfBirth(newDate: string) {
            this._dateOfBirth = new Date(newDate);
        },

        get dateOfBirth(): string {
            const dateOfBirth = new Intl.DateTimeFormat("da-DK", { year: "numeric", month: "long", day: "numeric" }).format(this._dateOfBirth);
            return dateOfBirth
        },

        get name(): string {
            return `${this._firstName} ${this._lastName}`
        },

        get age(): number {
            const time = this._dateOfBirth.getTime();
            const dateObject = new Date();
            const date = dateObject.getTime();
            const result = date - time;
            const age = Math.floor(result / 1000 / 60 / 60 / 24 / 365);

            return age;
        },

        isJunior(): boolean {
            return this.age < 18 ? true : false;
        },

        isSenior(): boolean {
            return this.age >= 18 ? true : false;
        }
    }

    Object.defineProperty(newMember, "_id", {
        writable: false,
        configurable: false
    })

    Object.defineProperty(newMember, "_name", {
        enumerable: false
    })

    Object.defineProperty(newMember, "_image", {
        enumerable: false,
    });


    return newMember;
}

function factoryResult(rawResult: RawResult): Result {
    const newResult: Result = {
        _id: rawResult.id,
        _memberId: rawResult.memberId, 
        _competitionLocation: rawResult.competitionLocation,
        _competitionName: rawResult.competitionName,
        _competitionPlacement: rawResult.competitionPlacement,
        _date: new Date(rawResult.date),
        _discipline: rawResult.discipline,
        _resultType: rawResult.resultType,
        _time: undefined,
        _member: undefined,


        set time(newTime: string) {
            try {
                if (!newTime.includes(":") || newTime.includes(".")) {
                    throw new Error("Wrong format");
                }

                const [minutes, secondsAndMiliSec] = newTime.split(":");
                const [seconds, milliSeconds] = secondsAndMiliSec.split(".");
                const time = Number(minutes) * 60000 + Number(seconds) * 1000 + Number(milliSeconds);
                this._time = time;

            } catch (error) {
                console.log(error);
            }
        },

        get member(): Member | undefined {
            return this._member
        },

        set member(memberId: string) {
            const memberFound = membersArr.find((member) => member._id === memberId); 

            if (!memberFound) {
                console.error("Could not attach member");
            } else {
                this._member = memberFound;
            }
        },


        isTraining(): boolean {
            return this._resultType === "training" ? true : false;
        },

        isCompetition(): boolean {
            return this._resultType === "competition" ? true : false;
        }
    }

    Object.defineProperty(newResult, "_id", {
        writable: false,
        configurable: false,
    });

    Object.defineProperty(newResult, "isTraining", {
        enumerable: false
    });

    Object.defineProperty(newResult, "isCompetition", {
        enumerable: false,
    });

    newResult.time = rawResult.time;
    newResult.member = rawResult.memberId;

    return newResult;
}



export {factoryMember, factoryResult}


export class Member {
    _id: string;
    _firstName: string;
    _lastName: string;
    _email: string;
    _dateOfBirth: Date;
    _disciplines: string[] | undefined;
    _gender: string;
    _hasPayed: boolean;
    _image: string;
    _isActiveMember: boolean;
    _isCompetitive: boolean;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        dateOfBirth: string,
        disciplines: string[] | undefined,
        gender: string,
        hasPayed: boolean,
        image: string,
        isActiveMember: boolean,
        isCompetitive: boolean
    ) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._dateOfBirth = new Date(dateOfBirth);
        this._disciplines = disciplines;
        this._gender = gender;
        this._hasPayed = hasPayed;
        this._image = image;
        this._isActiveMember = isActiveMember;
        this._isCompetitive = isCompetitive;
    }

    set dateOfBirth(newDate: string) {
        this._dateOfBirth = new Date(newDate);
    }

    get dateOfBirthToString(): string {
        const dateOfBirth = new Intl.DateTimeFormat("da-DK", { year: "numeric", month: "long", day: "numeric" }).format(this._dateOfBirth);
        return dateOfBirth;
    }

    get name(): string {
        return `${this._firstName} ${this._lastName}`;
    }

    get age(): number {
        const time = this._dateOfBirth.getTime();
        const dateObject = new Date();
        const date = dateObject.getTime();
        const result = date - time;
        const age = Math.floor(result / 1000 / 60 / 60 / 24 / 365);

        return age;
    }

    get isActiveMember(): boolean {
        return this._isActiveMember;
    }

    get disciplines(): string[] | undefined {
        // let danskArr: string[] = [];

        // if (!this._disciplines) {
        //     return "Ingen";
        // }

        // for (const discipline of this._disciplines) {
        //     danskArr.push(discipliner[`${discipline}`]);
        // }

        // return danskArr.join(", ");

        if (this._disciplines) {
            return this._disciplines;
        } else {
            return undefined;
        }
    }

    isJunior(): boolean {
        return this.age < 18;
    }

    isSenior(): boolean {
        return this.age >= 18;
    }

    
}

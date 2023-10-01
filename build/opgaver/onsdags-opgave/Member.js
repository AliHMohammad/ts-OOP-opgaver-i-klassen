export class Member {
    _id;
    _firstName;
    _lastName;
    _email;
    _dateOfBirth;
    _disciplines;
    _gender;
    _hasPayed;
    _image;
    _isActiveMember;
    _isCompetitive;
    constructor(id, firstName, lastName, email, dateOfBirth, disciplines, gender, hasPayed, image, isActiveMember, isCompetitive) {
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
    set dateOfBirth(newDate) {
        this._dateOfBirth = new Date(newDate);
    }
    get dateOfBirthToString() {
        const dateOfBirth = new Intl.DateTimeFormat("da-DK", { year: "numeric", month: "long", day: "numeric" }).format(this._dateOfBirth);
        return dateOfBirth;
    }
    get name() {
        return `${this._firstName} ${this._lastName}`;
    }
    get age() {
        const time = this._dateOfBirth.getTime();
        const dateObject = new Date();
        const date = dateObject.getTime();
        const result = date - time;
        const age = Math.floor(result / 1000 / 60 / 60 / 24 / 365);
        return age;
    }
    get isActiveMember() {
        return this._isActiveMember;
    }
    get disciplines() {
        if (this._disciplines) {
            return this._disciplines;
        }
        else {
            return undefined;
        }
    }
    isJunior() {
        return this.age < 18;
    }
    isSenior() {
        return this.age >= 18;
    }
}

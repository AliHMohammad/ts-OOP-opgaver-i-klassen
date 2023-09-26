
export interface Member {
    _id: string;
    _dateOfBirth: Date;
    _disciplines?: string[];
    _email: string;
    _firstName: string;
    _lastName: string;
    _gender: string;
    _hasPayed: boolean;
    _image: string;
    _isActiveMember: boolean;
    _isCompetitive: boolean;


    get name(): string;
    get age(): number;
    set dateOfBirth(a: string);
    get dateOfBirth(): string;
    get isActiveMember(): string;
    get disciplines(): string;

    isJunior(): boolean;
    isSenior(): boolean;
}

export interface RawMember {
    id: string;
    dateOfBirth: string;
    disciplines?: string[];
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    hasPayed: boolean;
    image: string;
    isActiveMember: boolean;
    isCompetitive: boolean;
}

export interface Result {
    _id: string;
    _competitionLocation: string;
    _competitionName: string;
    _competitionPlacement: number;
    _date: Date;
    _discipline: string;
    _memberId: string;
    _resultType: string;
    _time: number | undefined;
    _member: Member | undefined;


    set time(a: string | number);
    get time(): string | undefined;
    get timeMiliSeconds(): number;
    get member(): Member | undefined;
    set member(memberId: string);
    get date(): string;
    get discipline(): string;
    get resultType(): string;


    isTraining(): boolean;
    isCompetition(): boolean;
}

export interface RawResult {
    id: string;
    competitionLocation: string;
    competitionName: string;
    competitionPlacement: number;
    date: string;
    discipline: string;
    memberId: string;
    resultType: string;
    time: string;
}
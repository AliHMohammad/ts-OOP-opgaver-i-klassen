import { Member as MemberClass } from "./Member";

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
    get dateOfBirthToString(): string;
    get isActiveMember(): boolean;
    get disciplines(): string[] | undefined;

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

    set timeToString(a: string | number);
    get timeToString(): string;
    get time(): number;
    get member(): Member | undefined;
    set member(memberId: string);
    get dateToString(): string;
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

export interface Render {
    render: (container: HTMLElement) => void;
    postRender: (containerLastChild: HTMLElement) => void;
}

export interface StaticRender {
    
    sort: (a: MemberClass[], b: keyof MemberClass, c: string, d: boolean) => void;
    sortByString(a: MemberClass[], b: keyof MemberClass): void;
    clear: (container: HTMLElement) => void;
}
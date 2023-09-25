
interface Person {
    firstName: string | undefined,
    middleName: string | undefined,
    lastName: string | undefined

    getFullName(): string | undefined,

    hasMiddleName(): boolean,

    setFullName(fullName: string): void
}


const person: Person = {
    firstName:"Ali",
    middleName: "Haider",
    lastName: "Mohammad",

    getFullName(): string {
        if (this.middleName === undefined) {
            return `${this.firstName} ${this.lastName}`;
        } else {
            return `${this.firstName} ${this.middleName} ${this.lastName}`;
        }
    },

    hasMiddleName(): boolean {
        return this.middleName ? true : false;
    },

    setFullName(fullName: string): void {
        // const [firstName, middleName, LastName] = fullName.split(" ");
        const fullNameArr = fullName.split(" ");
        this.firstName = fullNameArr[0];
        this.lastName = fullNameArr[fullNameArr.length - 1];

        let middleName = "";

        if (fullNameArr.length === 2) {
            this.middleName = undefined;
        } else {
            for (let i = 1; i < fullNameArr.length - 1; i++){
                if (i === fullNameArr.length - 2) {
                    middleName += `${fullNameArr[i]}`;
                } else {
                    middleName += `${fullNameArr[i]} `;

                }
            }
            this.middleName = middleName;
        }

    }
}

console.log(person.getFullName());
person.setFullName("Peter Olesen");
console.log(person.getFullName());
person.setFullName("Jens Birke Petersen Henriksen")
console.log(person.getFullName());
person.setFullName("Harry James Potter");
console.log(person.getFullName());



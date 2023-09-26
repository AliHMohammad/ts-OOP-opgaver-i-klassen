function constructPerson(fullName) {
    const person = {
        _firstName: undefined,
        _middleName: undefined,
        _lastName: undefined,
        _age: 0,
        set age(newAge) {
            this._age = newAge;
        },
        get age() {
            return this._age;
        },
        get fullName() {
            if (this._middleName === undefined) {
                return `${this._firstName} ${this._lastName}`;
            }
            else {
                return `${this._firstName} ${this._middleName} ${this._lastName}`;
            }
        },
        isAdult() {
            if (this._age >= 18) {
                console.log(`The student is ${this._age} and is old enough!`);
            }
            else {
                console.log(`The student is ${this._age} and NOT old enough!`);
            }
        },
        hasMiddleName() {
            return this._middleName ? true : false;
        },
        set fullName(fullName) {
            // const [firstName, middleName, LastName] = fullName.split(" ");
            const fullNameArr = fullName.split(" ");
            if (fullNameArr.length < 2) {
                throw new Error("Missing last name");
            }
            this._firstName = fullNameArr[0];
            this._lastName = fullNameArr[fullNameArr.length - 1];
            if (fullNameArr.length === 2) {
                this._middleName = undefined;
            }
            else {
                let middleName = "";
                for (let i = 1; i < fullNameArr.length - 1; i++) {
                    if (i === fullNameArr.length - 2) {
                        middleName += `${fullNameArr[i]}`;
                    }
                    else {
                        middleName += `${fullNameArr[i]} `;
                    }
                }
                this._middleName = middleName;
            }
        },
    };
    person.fullName = fullName;
    return person;
}
const ali = constructPerson("Ali Haider Mohammad");
console.log(ali.age);
ali.age = 33;
console.log(ali.age);
for (const key in ali) {
    const value = ali[key];
    console.log(`Key: ${key}, Value: ${value}`);
}
Object.defineProperty(ali, "hasMiddleName", {
    enumerable: false
});
console.log("=======================");
for (const key in ali) {
    const value = ali[key];
    console.log(`Key: ${key}, Value: ${value}`);
}
export {};
// Object.seal(ali);
// ali.age =  123;
// console.log(ali.age);
// Object.freeze(ali);
// ali.age = 333;
// console.log(ali.age);
// person.fullName = "Peter Olesen";
// console.log(person.fullName);
// console.log(person.hasMiddleName());
// person.fullName = "Jens Birke Petersen Henriksen";
// console.log(person.fullName);
// person.fullName = "Harry James Potter";
// console.log(person.fullName);
// console.log(person.hasMiddleName());

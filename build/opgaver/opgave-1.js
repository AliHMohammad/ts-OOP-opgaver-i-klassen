"use strict";
const person = {
    firstName: "Ali",
    middleName: "Haider",
    lastName: "Mohammad",
    getFullName() {
        if (this.middleName === undefined) {
            return `${this.firstName} ${this.lastName}`;
        }
        else {
            return `${this.firstName} ${this.middleName} ${this.lastName}`;
        }
    },
    hasMiddleName() {
        return this.middleName ? true : false;
    },
    setFullName(fullName) {
        // const [firstName, middleName, LastName] = fullName.split(" ");
        const fullNameArr = fullName.split(" ");
        this.firstName = fullNameArr[0];
        this.lastName = fullNameArr[fullNameArr.length - 1];
        let middleName = "";
        if (fullNameArr.length === 2) {
            this.middleName = undefined;
        }
        else {
            for (let i = 1; i < fullNameArr.length - 1; i++) {
                if (i === fullNameArr.length - 2) {
                    middleName += `${fullNameArr[i]}`;
                }
                else {
                    middleName += `${fullNameArr[i]} `;
                }
            }
            this.middleName = middleName;
        }
    }
};
console.log(person.getFullName());
person.setFullName("Peter Olesen");
console.log(person.getFullName());
person.setFullName("Jens Birke Petersen Henriksen");
console.log(person.getFullName());
person.setFullName("Harry James Potter");
console.log(person.getFullName());

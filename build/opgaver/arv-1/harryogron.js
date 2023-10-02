"use strict";
//@ts-nocheck
function constructStudent(firstName, lastName) {
    const student = {
        firstName: firstName,
        lastName: lastName,
        get fullName() {
            return `${this.firstName} ${this.lastName}`;
        }
    };
    return student;
}
const harry = constructStudent("Harry", "Potter");
const ron = constructStudent("Ron", "Weasley");

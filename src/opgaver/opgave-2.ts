import { Person } from "./opgave-1.js";
import fs from "fs/promises";

//Factory function

function constructPerson(fullName: string): Person {
    const person: Person = {
        firstName: undefined,
        middleName: undefined,
        lastName: undefined,

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

            if (fullNameArr.length < 2) {
                throw new Error("Missing last name");
            }

            this.firstName = fullNameArr[0];
            this.lastName = fullNameArr[fullNameArr.length - 1];

            if (fullNameArr.length === 2) {
                this.middleName = undefined;
            } else {
                let middleName = "";
                for (let i = 1; i < fullNameArr.length - 1; i++) {
                    if (i === fullNameArr.length - 2) {
                        middleName += `${fullNameArr[i]}`;
                    } else {
                        middleName += `${fullNameArr[i]} `;
                    }
                }
                this.middleName = middleName;
            }
        },
    };

    person.setFullName(fullName);

    return person
}

function showStudentNames(students: Person[]) {
    for (const student of students) {
        
        logStudentName(student);
    }
}

function logStudentName(student: Person): void {
    console.log(`First name: ${student.firstName}, Middle name: ${student.middleName}, Last name: ${student.lastName}`);
    console.log("Full name: " + student.getFullName());
    
}

function createStudentsByName(students: { fullname: string, gender: string, house: string}[]): Person[] {
    let studentsArr: Person[] = [];
    
    for (const student of students) {
        studentsArr.push(constructPerson(student.fullname))
    }

    return studentsArr;
}

// const ali = constructPerson("Ali Haider Mohammmad");
// console.log(ali.getFullName());
// const studentNames = ["Harry Nielsen Bruh Potter", "Ali Haider Mohammad", "Chris Jensen"];
// const mitArr = createStudentsByName(studentNames);

async function readStudents() {
    const studentsAsJSON = await fs.readFile("data.json");
    const students = JSON.parse(studentsAsJSON.toString());

    return students;
}

const dataStudents = await readStudents();
const studentsArr: Person[] = createStudentsByName(dataStudents);

showStudentNames(studentsArr);


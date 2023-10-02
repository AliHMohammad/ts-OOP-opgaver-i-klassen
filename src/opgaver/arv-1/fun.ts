
//@ts-nocheck
function Student(firstName: string, lastName: string, height: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.height = height;
    
    Object.defineProperty(this, 'fullName', {
        get() {
            return `${this.firstName} ${this.lastName}`;
        }
    });

    this.toString = function () {
        return this.fullName;
    }

    this.valueOf = function () {
        return this.height;
    }
}

const harry = new Student("Harry", "Potter", 165);
const ron = new Student("Ron", "Weasley", 170);
const hermione = new Student("Herimone", "Granger", 156);

console.log(`Harrys objekter: ${harry}`);

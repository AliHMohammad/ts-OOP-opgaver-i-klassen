

function Student(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    
    Object.defineProperty(this, 'fullName', {
        get() {
            return `${this.firstName} ${this.lastName}`;
        }
    });
}

const harry = new Student("Harry", "Potter");
const ron = new Student("Ron", "Weasley");
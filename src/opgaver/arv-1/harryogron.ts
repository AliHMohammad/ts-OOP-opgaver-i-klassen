function constructStudent(firstName: string, lastName: string) {
    const student = {
        firstName: firstName,
        lastName: lastName,

        get fullName(): string {
            return `${this.firstName} ${this.lastName}`;
        }
    };

    return student;
}


const harry = constructStudent("Harry", "Potter");
const ron = constructStudent("Ron", "Weasley");
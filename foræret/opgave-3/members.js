main();

const members = [];

async function main() {
    await buildMembersList();
    displayMembers(members);
    console.log(members[0].getAge());
}

async function fetchMembers() {
    const resp = await fetch("members.json");
    const data = await resp.json();
    return data;
}

async function buildMembersList() {
    const originalObjects = await fetchMembers();

    for (const orgobj of originalObjects) {
        const memberObj = constructMember(orgobj);
        members.push(memberObj);
    }
}

function displayMembers(members) {
    const table = document.querySelector("table#members tbody");
    table.innerHTML = "";
    for (const member of members) {
        // console.log(member.birthday);
        const html = /*html*/ `
    <tr>
      <td>${member.name}</td>
      <td>${member.active}</td>
      <td>${new Intl.DateTimeFormat(["ban", "id"]).format(member.birthday)}</td>
      <td>${member.getAge()}</td>
      <td style="text-align: center;">${member.getMemberShip()}</td>
      <td>${member.email}</td>
    </tr>`;

        table.insertAdjacentHTML("beforeend", html);
    }
}

function constructMember(memberdata) {
    const MemberObject = {
        name: memberdata.firstName,
        active: memberdata.isActiveMember,
        competitive: memberdata.isCompetitive,
        birthday: new Date(memberdata.dateOfBirth),
        email: memberdata.email,
        gender: memberdata.gender,
        image: memberdata.image,
        hasPayed: memberdata.hasPayed,

        getAge() {
            const time = this.birthday.getTime();
            const dateObject = new Date();
            const date = dateObject.getTime();
            const result = date - time;
            const age = Math.floor(result / 1000 / 60 / 60 / 24 / 365);

            return age;
        },

        isJunior() {
            return this.getAge() < 18 ? true : false
        },

        isSenior() {
            return this.getAge() >= 18 ? true : false;
        },

        getMemberShip() {
            return this.getAge() >= 18 ? "Senior" : "Junior";
        }

    };

    return MemberObject;
}

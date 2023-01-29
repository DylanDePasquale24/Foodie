export interface User {
    name: string;
    age?: number;
    id: number;
    email: string;
}

let { name : userName, email: userLogin }: User = { name: "Bill", id: 1, email: ""};

// user.name;
// user.email;
// userName;
// userLogin;

interface Employees extends User {
    salary: number;
}

let employee: Employees = { name: "Bill", id: 1, email: "", salary: 1000};

// Method definition, interface is not responsible for implementation
export interface Login {
    login(): User;
}

let [user1, user2, ...restUsers]: User[] = [
    { name: "John", id: 1, email: "" },
    { name: "Bill", id: 2, email: "" },
    { name: "Mike", id: 3, email: "" },
    { name: "Steve", id: 4, email: ""},
    { name: "Ben", id: 5, email: ""}
];

console.log(user1);
console.log(user2);
console.log(restUsers);

// let result = restUsers.filter(user => user.id > 3);

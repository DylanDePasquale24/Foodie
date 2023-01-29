"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let { name: userName, email: userLogin } = { name: "Bill", id: 1, email: "" };
let employee = { name: "Bill", id: 1, email: "", salary: 1000 };
let [user1, user2, ...restUsers] = [
    { name: "John", id: 1, email: "" },
    { name: "Bill", id: 2, email: "" },
    { name: "Mike", id: 3, email: "" },
    { name: "Steve", id: 4, email: "" },
    { name: "Ben", id: 5, email: "" }
];
console.log(user1);
console.log(user2);
console.log(restUsers);
// let result = restUsers.filter(user => user.id > 3);
//# sourceMappingURL=interface.js.map
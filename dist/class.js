"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Employee_id;
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    //constructor(){} multiple constructor implementations not allowed
    constructor(id, name, address) {
        _Employee_id.set(this, void 0);
        __classPrivateFieldSet(this, _Employee_id, id, "f");
        this.name = name;
        this.address = address;
    }
    login() {
        return { name: this.name, id: __classPrivateFieldGet(this, _Employee_id, "f"), email: "" };
    }
    get empId() {
        return __classPrivateFieldGet(this, _Employee_id, "f");
    }
    set empId(id) {
        __classPrivateFieldSet(this, _Employee_id, id, "f");
    }
    getNamewithAddress() {
        return `${this.name} stays at ${this.address.street}`;
    }
    static getEmployeeCount() {
        return 50;
    }
}
_Employee_id = new WeakMap();
let john = new Employee(1, "John", {
    street: "123 London Street",
    city: "London",
    state: "UK",
    pin: "12345"
});
// Using getters and setters
john.empId = 200;
console.log(john.empId);
class Manager extends Employee {
    constructor(id, name, address) {
        super(id, name, address);
    }
    getNamewithAddress() {
        return `${this.name} is a manager at ${this.address.street}`;
    }
}
let address = john.getNamewithAddress();
let mike = new Manager(2, "Mike", {
    street: "456 Main Street",
    city: "New York",
    state: "USA",
    pin: "67890"
});
console.log(john);
console.log(address);
console.log(mike.getNamewithAddress());
console.log(Employee.getEmployeeCount());
//# sourceMappingURL=class.js.map
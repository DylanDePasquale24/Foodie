"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Employee_id;
class Employee {
    //constructor(){} multiple constructor implementations not allowed
    constructor(id, name, address) {
        _Employee_id.set(this, void 0);
        __classPrivateFieldSet(this, _Employee_id, id, "f");
        this.name = name;
        this.address = address;
    }
    getNamewithAddress() {
        return `${this.name} stays at ${this.address}`;
    }
}
_Employee_id = new WeakMap();
let john = new Employee(1, "John", "123 London Street");
class Manager extends Employee {
    constructor(id, name, address) {
        super(id, name, address);
    }
    getNamewithAddress() {
        return `${this.name} is a manager at ${this.address}`;
    }
}
let address = john.getNamewithAddress();
let mike = new Manager(2, "Mike", "456 Main Street");
console.log(john);
console.log(address);
console.log(mike.getNamewithAddress());

import {Login, User} from './interface';

interface Address {
    street: string;
    city: string;
    state: string;
    pin: string;
}

class Employee implements Login{
    #id: number;
    protected name: string;
    address: Address;
    
    //constructor(){} multiple constructor implementations not allowed

    constructor(id: number, name: string, address: Address) {
        this.#id = id;
        this.name = name;
        this.address = address;
    }

    login(): User {
        return {name: this.name, id: this.#id, email: ""};
    }

    get empId(): number {
        return this.#id;
    }

    set empId(id: number) {
        this.#id = id;
    }

    getNamewithAddress(): string {
        return `${this.name} stays at ${this.address.street}`;
    }

    static getEmployeeCount(): number {
        return 50;
    }
}

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
    constructor(id: number, name: string, address: Address) {
        super(id, name, address);
    }

    getNamewithAddress(): string {
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
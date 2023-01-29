class Employee {
    #id: number;
    protected name: string;
    address: string;
    
    //constructor(){} multiple constructor implementations not allowed

    constructor(id: number, name: string, address: string) {
        this.#id = id;
        this.name = name;
        this.address = address;
    }

    getNamewithAddress(): string {
        return `${this.name} stays at ${this.address}`;
    }
}

let john = new Employee(1, "John", "123 London Street");

class Manager extends Employee {
    constructor(id: number, name: string, address: string) {
        super(id, name, address);
    }

    getNamewithAddress(): string {
        return `${this.name} is a manager at ${this.address}`;
    }
}

let address = john.getNamewithAddress();

let mike = new Manager(2, "Mike", "456 Main Street");


console.log(john);
console.log(address);
console.log(mike.getNamewithAddress());
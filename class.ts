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

    get empId(): number {
        return this.#id;
    }

    set empId(id: number) {
        this.#id = id;
    }

    getNamewithAddress(): string {
        return `${this.name} stays at ${this.address}`;
    }

    static getEmployeeCount(): number {
        return 50;
    }
}

let john = new Employee(1, "John", "123 London Street");

// Using getters and setters
john.empId = 200;
console.log(john.empId);

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
console.log(Employee.getEmployeeCount());
let lname : string;
lname = "Qian";
// lname = 10;
let newname = lname.toUpperCase();

console.log(newname);

let age: number;
age = 25;
age = 25.5;
let dob = "25";
let result = parseInt(dob);

let isValid: boolean = true;
console.log(isValid);

let empList : string[];

empList = ["Qian1", "Qian2", "Qian3"];

let numList : Array<number>;

numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let results = numList.filter((num) => num > 2);

let num = numList.find((num) => num === 2);

let emp = empList.find((emp) => emp === "Qian1");

let sum = numList.reduce((acc, num) => acc + num);

console.log(results);
console.log(num);
console.log(emp);
console.log(sum);

const enum Color {
    Red,
    Green,
    Blue
}

let c: Color = Color.Blue;

// Tuples are useful for functions that return multiple values/types
let swapNums : [number, number];

function swapNumbers(num1: number, num2: number) : [number, number] {
    return [num2, num1];
}

swapNums = swapNumbers(10, 20);

swapNums[0];
swapNums[1];

let department: any;

department = "IT";
department = 10;


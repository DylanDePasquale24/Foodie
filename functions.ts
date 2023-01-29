// function with optional parameters
function add(a: number, b: number, c?: number): number {
    return c ? a + b + c : a + b;

}

console.log(add(2, 3));

console.log(add(2, 3, 4));

// function with required parameters
const sub = (a: number, b: number, c = 10): number => a - b - c;

console.log(sub(2, 3));
console.log(sub(2, 3, 5));

const mult = function (a: number, b: number): number {
    return a * b;
}

console.log(mult(2, 3));

// function with rest parameters
function add2(a: number, b: number, ...c: number[]): number {
    return a + b + c.reduce((a, b) => a + b, 0);
}

console.log(add2(2, 3, ...[1, 2, 3]));
console.log(add2(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14));

function getItems<Type>(items: Type[]): Type[] {
    return new Array<Type>().concat(items);
}

let concatResult = getItems<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

let concatString = getItems<string>(["a", "b", "c"]);

console.log(concatResult);
console.log(concatString);

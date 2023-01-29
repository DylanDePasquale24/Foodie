"use strict";
// function with optional parameters
function add(a, b, c) {
    return c ? a + b + c : a + b;
}
console.log(add(2, 3));
console.log(add(2, 3, 4));
// function with required parameters
const sub = (a, b, c = 10) => a - b - c;
console.log(sub(2, 3));
console.log(sub(2, 3, 5));
const mult = function (a, b) {
    return a * b;
};
console.log(mult(2, 3));
// function with rest parameters
function add2(a, b, ...c) {
    return a + b + c.reduce((a, b) => a + b, 0);
}
console.log(add2(2, 3, ...[1, 2, 3]));
console.log(add2(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14));
function getItems(items) {
    return new Array().concat(items);
}
let concatResult = getItems([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
let concatString = getItems(["a", "b", "c"]);
console.log(concatResult);
console.log(concatString);
//# sourceMappingURL=functions.js.map
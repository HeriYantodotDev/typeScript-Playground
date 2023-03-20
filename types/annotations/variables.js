"use strict";
//Type Annotations
let apples = 5;
let speed = 'fast';
let hasName = true;
let nothingMuch = null;
let nothing = undefined;
// built in objects
let now = new Date();
//array
let colors;
colors = ['red', 'blue', 'green'];
let animals;
animals = ['Elephant', 'Tiger'];
let myNumbers = [1, 2, 3];
myNumbers = [5, 6, 7];
//Classes
class Car {
}
let car = new Car();
//object literal 
let point = {
    x: 10,
    y: 20
};
// Function 
// we can use both of thid
const logNumber = (i) => {
    console.log(i);
};
const logNumber2 = (i) => {
    console.log(i);
};
//When to use annotations 
// 1) Function that returns the 'any` type 
const json = '{"x": 10, "y": 20}';
const coordinates = JSON.parse(json);
console.log(coordinates);
//2) 
let words = ['red', 'green', 'blue'];
let foundWord;
for (let i = 0; i < words.length; i++) {
    if (words[i] === 'green') {
        foundWord = true;
    }
}
//Variable whose type cannot be inferred correctly 
let numbers = [-10, -1, 12];
let numberAboveZero = false;
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
        numberAboveZero = numbers[i];
    }
}

"use strict";
//Type Annotations
var apples = 5;
var speed = 'fast';
var hasName = true;
var nothingMuch = null;
var nothing = undefined;
// built in objects
var now = new Date();
//array
var colors;
colors = ['red', 'blue', 'green'];
var animals;
animals = ['Elephant', 'Tiger'];
var myNumbers = [1, 2, 3];
myNumbers = [5, 6, 7];
//Classes
var Car = /** @class */ (function () {
    function Car() {
    }
    return Car;
}());
var car = new Car();
//object literal 
var point = {
    x: 10,
    y: 20
};
// Function 
// we can use both of thid
var logNumber = function (i) {
    console.log(i);
};
var logNumber2 = function (i) {
    console.log(i);
};
//When to use annotations 
// 1) Function that returns the 'any` type 
var json = '{"x": 10, "y": 20}';
var coordinates = JSON.parse(json);
console.log(coordinates);
//2) 
var words = ['red', 'green', 'blue'];
var foundWord;
for (var i = 0; i < words.length; i++) {
    if (words[i] === 'green') {
        foundWord = true;
    }
}
//Variable whose type cannot be inferred correctly 
var numbers = [-10, -1, 12];
var numberAboveZero = false;
for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
        numberAboveZero = numbers[i];
    }
}

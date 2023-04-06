"use strict";
var ArrayParent = /** @class */ (function () {
    function ArrayParent(collection) {
        this.collection = collection;
    }
    ArrayParent.prototype.get = function (index) {
        return this.collection[index];
    };
    return ArrayParent;
}());
var test1 = new ArrayParent([5, 7, 7]);
function printStrings(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(i);
    }
}
function printNumbers(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(i);
    }
}
function printArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}
printArray([4, 3, 2]);
printArray([4, 3, 2]);
var Car2 = /** @class */ (function () {
    function Car2() {
    }
    Car2.prototype.print = function () {
        console.log('I am a car');
    };
    return Car2;
}());
var House = /** @class */ (function () {
    function House() {
    }
    House.prototype.print = function () {
        console.log('I am a house');
    };
    return House;
}());
function printHousesOrCars(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].print();
    }
}

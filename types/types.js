"use strict";
var today = new Date();
today.getMonth();
var person = {
    age: 20
};
var Color = /** @class */ (function () {
    function Color(name) {
        this.name = "no color";
        this.name = name;
    }
    return Color;
}());
var red = new Color('blue');
console.log(red.name);

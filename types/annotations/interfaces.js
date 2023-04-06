"use strict";
var oldPhone = {
    name: 'Old Iphone',
    year: new Date(),
    broken: true,
    summary: function () {
        return "Name : ".concat(this.name);
    }
};
var drink2 = {
    color: 'brown',
    carbonated: true,
    sugar: 40,
    summary: function () {
        return "My drink has ".concat(this.sugar, " grams of sugar");
    }
};
var printRepot = function (item) {
    console.log(item.summary());
};
printRepot(oldPhone);
printRepot(drink2);

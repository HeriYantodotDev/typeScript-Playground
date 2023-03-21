"use strict";
const oldPhone = {
    name: 'Old Iphone',
    year: new Date(),
    broken: true,
    summary() {
        return `Name : ${this.name}`;
    }
};
const drink2 = {
    color: 'brown',
    carbonated: true,
    sugar: 40,
    summary() {
        return `My drink has ${this.sugar} grams of sugar`;
    }
};
const printRepot = (item) => {
    console.log(item.summary());
};
printRepot(oldPhone);
printRepot(drink2);

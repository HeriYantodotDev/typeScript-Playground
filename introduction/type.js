"use strict";
//boolean
let isCool = true;
//number
let age = 56;
//string
let oke = 'whata';
let eyeColor = 'brown';
let favoriteQuote = `I'm not old, I'm only ${age}`;
//array
let pets = ['cat', 'dog', 'pig'];
let pets2 = ['lion', 'dragon', 'lizard'];
//object
let wizard = {
    a: 'john'
};
//Tuple
let basket;
basket = ['basketball', 5];
//Enum
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
;
let sizeName = Size[2];
let sizeNumber = Size.Small;
console.log(sizeName); //Medium
console.log(sizeNumber); //1
// Any
let whatever = 'asdfadsf';
whatever = 14;
whatever = ['wu ha'];
//void
let sing = () => {
    console.log('lalla');
};
let song = () => {
    console.log('lalla');
    return 'lala';
};
//never
function error(message) {
    console.log('Error');
    throw new Error(message);
}
//interface
let fightRobotArmy = (robots) => {
    console.log('Fight');
};
let fightRobotArmy2 = (robots) => {
    console.log('Fight');
};
let dog = {};
// function 
let fightRobotArmy3 = (robots) => {
    console.log('Fight');
};
let fightRobotArmy4 = (robots) => {
    console.log('Fight');
    return 5;
};
// class
class Animal {
    constructor(sound) {
        this.sing = 'Default Value';
        this.song = 'askdhf';
        this.sing = sound;
    }
    greet() {
        return `Hello ${this.sing}`;
    }
}
let lion = new Animal('RAAAARRH');
console.log(lion.greet());
// union
let confused;
confused = 'oke';
confused = 4;
confused = true;
//null and undefined
let meh = undefined;
let noo = null;

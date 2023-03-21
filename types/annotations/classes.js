"use strict";
class Vehicle {
    // color: string;
    // constructor(color: string = 'no no color'){
    //   this.color = color;
    // }
    // or we can just use like this 
    constructor(color = 'no no color') {
        this.color = color;
    }
    ;
    drive() {
        console.log('brumm');
    }
    //We can only use private in this class only
    sound() {
        console.log('Jrenggg!!!');
    }
    //We can use this in this class and in the child class 
    //But we can't use this in the instance. 
    honk() {
        console.log('beep beep');
    }
}
class MotorCycle extends Vehicle {
    constructor(wheels = 2, color) {
        super(color);
        this.wheels = wheels;
        this.color = color;
    }
    //overriding the existing class
    drive() {
        console.log('The motorcyle is running!!!');
    }
    //we can use this in this child class
    honk() {
    }
}
const motor = new MotorCycle(2, 'red');
console.log(motor.color);
motor.drive();
const newCar = new Vehicle('orange');
console.log(newCar.color);
const newCar2 = new MotorCycle(3, 'red');
console.log(newCar2.color);

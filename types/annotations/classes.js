"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vehicle = /** @class */ (function () {
    // color: string;
    // constructor(color: string = 'no no color'){
    //   this.color = color;
    // }
    // or we can just use like this 
    function Vehicle(color) {
        if (color === void 0) { color = 'no no color'; }
        this.color = color;
    }
    ;
    Vehicle.prototype.drive = function () {
        console.log('brumm');
    };
    //We can only use private in this class only
    Vehicle.prototype.sound = function () {
        console.log('Jrenggg!!!');
    };
    //We can use this in this class and in the child class 
    //But we can't use this in the instance. 
    Vehicle.prototype.honk = function () {
        console.log('beep beep');
    };
    return Vehicle;
}());
var MotorCycle = /** @class */ (function (_super) {
    __extends(MotorCycle, _super);
    function MotorCycle(wheels, color) {
        if (wheels === void 0) { wheels = 2; }
        var _this = _super.call(this, color) || this;
        _this.wheels = wheels;
        _this.color = color;
        return _this;
    }
    //overriding the existing class
    MotorCycle.prototype.drive = function () {
        console.log('The motorcyle is running!!!');
    };
    //we can use this in this child class
    MotorCycle.prototype.honk = function () {
    };
    return MotorCycle;
}(Vehicle));
var motor = new MotorCycle(2, 'red');
console.log(motor.color);
motor.drive();
var newCar = new Vehicle('orange');
console.log(newCar.color);
var newCar2 = new MotorCycle(3, 'red');
console.log(newCar2.color);

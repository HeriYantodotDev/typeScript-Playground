"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Boat = /** @class */ (function () {
    function Boat() {
        this.color = 'red';
    }
    Object.defineProperty(Boat.prototype, "formattedColor", {
        get: function () {
            return "This boat color is ".concat(this.color);
        },
        enumerable: false,
        configurable: true
    });
    ;
    Boat.prototype.pilot = function () {
        throw new Error();
    };
    ;
    __decorate([
        testDecorator,
        __metadata("design:type", String)
    ], Boat.prototype, "color", void 0);
    __decorate([
        logError('Ooop.... it\'s sinking!!! Help'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Boat.prototype, "pilot", null);
    return Boat;
}());
;
function logError(errorMessage) {
    return function (target, key, desc) {
        var method = desc.value;
        desc.value = function () {
            try {
                method();
            }
            catch (err) {
                console.log(errorMessage);
            }
            ;
        };
    };
}
;
function testDecorator(target, key) {
    console.log(target.color);
    console.log(target, key);
}
;
var boat = new Boat();
boat.pilot();

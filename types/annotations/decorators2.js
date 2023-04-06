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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function f(key) {
    console.log("evaluate: ", key);
    return function () {
        console.log("call: ", key);
    };
}
var C = /** @class */ (function () {
    function C(foo) {
    }
    C.method = function (foo) { };
    C.prototype.method = function (foo) { };
    __decorate([
        f("Instance Property"),
        __metadata("design:type", Number)
    ], C.prototype, "prop", void 0);
    __decorate([
        f("Instance Method"),
        __param(0, f("Instance Method Parameter")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], C.prototype, "method", null);
    __decorate([
        f("Static Property"),
        __metadata("design:type", Number)
    ], C, "prop", void 0);
    __decorate([
        f("Static Method"),
        __param(0, f("Static Method Parameter")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], C, "method", null);
    C = __decorate([
        f("Class Decorator"),
        __param(0, f("Constructor Parameter")),
        __metadata("design:paramtypes", [String])
    ], C);
    return C;
}());

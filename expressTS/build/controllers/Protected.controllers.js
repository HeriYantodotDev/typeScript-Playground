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
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("./decorators");
var ProtectedController = /** @class */ (function () {
    function ProtectedController() {
    }
    ProtectedController.prototype.getProtected = function (req, res) {
        res.send("\n      <h1>Welcome</h1>\n      <p>This is protected route, you log in as a USER</p>\n    ");
    };
    ;
    __decorate([
        (0, decorators_1.get)('/protected'),
        (0, decorators_1.use)(requireAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], ProtectedController.prototype, "getProtected", null);
    ProtectedController = __decorate([
        (0, decorators_1.controller)('')
    ], ProtectedController);
    return ProtectedController;
}());
;
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    else {
        res.status(403).send("\n      Sorry! You have to log in first!!!\n    ");
        return;
    }
    ;
}
;

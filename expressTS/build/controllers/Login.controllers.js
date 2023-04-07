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
function logger(req, res, next) {
    console.log('Request was made!!!');
    next();
}
;
var LoginControllers = /** @class */ (function () {
    function LoginControllers() {
    }
    LoginControllers.prototype.getLogin = function (req, res) {
        res.send("\n    <form method=\"POST\">\n      <div>\n        <label>Email</label>\n        <input name=\"email\" />\n      </div>\n      <div>\n        <label>Password</label>\n        <input name= \"password\" type=\"Password\" />\n      </div>\n      <div>\n        <button>Submit</button>\n      </div>\n    </form>\n  ");
    };
    ;
    LoginControllers.prototype.postLogin = function (req, res) {
        var _a = req.body, email = _a.email, password = _a.password;
        if (!email || !password) {
            res.send("Hey Input it correctly please!");
            return;
        }
        ;
        if (email !== 'test@gmail.com' && password !== "123") {
            res.send("Invalid email or password");
            return;
        }
        ;
        req.session = { loggedIn: true };
        res.redirect('/');
    };
    ;
    LoginControllers.prototype.getLogout = function (req, res) {
        if (req.session) {
            req.session.loggedIn = false;
            res.redirect('/');
        }
    };
    ;
    __decorate([
        (0, decorators_1.get)('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginControllers.prototype, "getLogin", null);
    __decorate([
        (0, decorators_1.post)('/login'),
        (0, decorators_1.bodyValidator)('email', 'password'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginControllers.prototype, "postLogin", null);
    __decorate([
        (0, decorators_1.get)('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginControllers.prototype, "getLogout", null);
    LoginControllers = __decorate([
        (0, decorators_1.controller)('/auth')
    ], LoginControllers);
    return LoginControllers;
}());
;

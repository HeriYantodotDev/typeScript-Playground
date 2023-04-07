var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
var Boat = function () {
    var _classDecorators = [classDecorator];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _color_decorators;
    var _color_initializers = [];
    var _get_formattedColor_decorators;
    var _pilot_decorators;
    var Boat = _classThis = /** @class */ (function () {
        function Boat_1() {
            this.color = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _color_initializers, 'red'));
        }
        Object.defineProperty(Boat_1.prototype, "formattedColor", {
            get: function () {
                return "This boat color is ".concat(this.color);
            },
            enumerable: false,
            configurable: true
        });
        ;
        Boat_1.prototype.pilot = function (speed, live) {
            if (speed === 'fast') {
                console.log('swish');
            }
            else {
                console.log('nothing');
            }
        };
        ;
        return Boat_1;
    }());
    __setFunctionName(_classThis, "Boat");
    (function () {
        _color_decorators = [testDecorator];
        _get_formattedColor_decorators = [testDecorator];
        _pilot_decorators = [logError('Ooop.... it\'s sinking!!! Help')];
        __esDecorate(_classThis, null, _get_formattedColor_decorators, { kind: "getter", name: "formattedColor", static: false, private: false, access: { has: function (obj) { return "formattedColor" in obj; }, get: function (obj) { return obj.formattedColor; } } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _pilot_decorators, { kind: "method", name: "pilot", static: false, private: false, access: { has: function (obj) { return "pilot" in obj; }, get: function (obj) { return obj.pilot; } } }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: function (obj) { return "color" in obj; }, get: function (obj) { return obj.color; }, set: function (obj, value) { obj.color = value; } } }, _color_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        Boat = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Boat = _classThis;
}();
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
    console.log(key);
}
;
function parameterDecorator(target, key, index) {
    console.log(key, index);
}
function classDecorator(constructor) {
    console.log(constructor);
}
//result
// color
// formattedColor
// pilot 1
// pilot 0
// [Function: Boat]

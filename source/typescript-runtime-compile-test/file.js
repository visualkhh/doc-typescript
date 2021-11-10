"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
var File = /** @class */ (function () {
    function File(name) {
        if (name === void 0) { name = 'say'; }
        this.name = name;
    }
    File.prototype.say = function () {
        console.log(this.name);
    };
    return File;
}());
exports.File = File;

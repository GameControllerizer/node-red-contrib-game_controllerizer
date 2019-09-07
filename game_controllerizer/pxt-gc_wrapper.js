"use strict";
exports.__esModule = true;
var PxtGcWrapper = /** @class */ (function () {
    function PxtGcWrapper() {
    }
    // serial.writeBuffer
    PxtGcWrapper.prototype.writeBuffer = function (a0) {
    };
    // serial.redirect
    PxtGcWrapper.prototype.redirect = function (a0, a1, a2) {
    };
    // serial.readBuffer
    PxtGcWrapper.prototype.readBuffer = function (a0) {
    };
    // serial.onDataReceived
    PxtGcWrapper.prototype.onDataReceived = function (a0, f0) {
    };
    // serial.delimiter
    PxtGcWrapper.prototype.delimiters = function (a0) {
    };
    // control.raiseEvent
    PxtGcWrapper.prototype.raiseEvent = function (a0, a1) { };
    // control.onEvent
    PxtGcWrapper.prototype.onEvent = function (a0, a1, a2) { };
    // pins.createBufferFromArray
    PxtGcWrapper.prototype.createBufferFromArray = function (a0) {
        return Buffer.from(a0);
    };
    return PxtGcWrapper;
}());
exports.PxtGcWrapper = PxtGcWrapper;
var PxtGcEnum;
(function (PxtGcEnum) {
    PxtGcEnum[PxtGcEnum["P0"] = 0] = "P0";
    PxtGcEnum[PxtGcEnum["P1"] = 1] = "P1";
    PxtGcEnum[PxtGcEnum["P2"] = 2] = "P2";
    PxtGcEnum[PxtGcEnum["P14"] = 3] = "P14";
    PxtGcEnum[PxtGcEnum["P15"] = 4] = "P15";
    PxtGcEnum[PxtGcEnum["P16"] = 5] = "P16";
    PxtGcEnum[PxtGcEnum["BaudRate115200"] = 6] = "BaudRate115200";
    PxtGcEnum[PxtGcEnum["NewLine"] = 7] = "NewLine";
})(PxtGcEnum = exports.PxtGcEnum || (exports.PxtGcEnum = {}));

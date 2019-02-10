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
var PxtGcSerialPin;
(function (PxtGcSerialPin) {
    PxtGcSerialPin[PxtGcSerialPin["P0"] = 0] = "P0";
    PxtGcSerialPin[PxtGcSerialPin["P1"] = 1] = "P1";
    PxtGcSerialPin[PxtGcSerialPin["P2"] = 2] = "P2";
    PxtGcSerialPin[PxtGcSerialPin["P14"] = 3] = "P14";
    PxtGcSerialPin[PxtGcSerialPin["P15"] = 4] = "P15";
    PxtGcSerialPin[PxtGcSerialPin["P16"] = 5] = "P16";
})(PxtGcSerialPin = exports.PxtGcSerialPin || (exports.PxtGcSerialPin = {}));
var PxtGcBaudRate;
(function (PxtGcBaudRate) {
    PxtGcBaudRate[PxtGcBaudRate["BaudRate9600"] = 0] = "BaudRate9600";
    PxtGcBaudRate[PxtGcBaudRate["BaudRate19200"] = 1] = "BaudRate19200";
    PxtGcBaudRate[PxtGcBaudRate["BaudRate38400"] = 2] = "BaudRate38400";
    PxtGcBaudRate[PxtGcBaudRate["BaudRate115200"] = 3] = "BaudRate115200";
})(PxtGcBaudRate = exports.PxtGcBaudRate || (exports.PxtGcBaudRate = {}));

"use strict";
/**
 * Language references
 * https://makecode.com/blog/github-packages
 * https://makecode.com/language
 * https://makecode.microbit.org/blocks/custom
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var pxt_gc_wrapper_1 = require("./pxt-gc_wrapper");
//% weight=100 color=#F1BC03 icon="\uf11b" block="GameControllerizer"
var gamecontrollerizer;
(function (gamecontrollerizer) {
    var wrapper_obj = new pxt_gc_wrapper_1.PxtGcWrapper();
    var serial = wrapper_obj;
    var pins = wrapper_obj;
    var control = wrapper_obj;
    var BaudRate = pxt_gc_wrapper_1.PxtGcBaudRate;
    var SerialPin = pxt_gc_wrapper_1.PxtGcSerialPin;
    var EXTERNAL_BUTTON_EVENT_ID = 12345;
    //////////////////////////////////////////////////////////////////////////////////////////
    // Types
    //////////////////////////////////////////////////////////////////////////////////////////
    var InputMode;
    (function (InputMode) {
        //% block="Hold"
        InputMode[InputMode["Hold"] = -1] = "Hold";
        //% block="Push"
        InputMode[InputMode["Push"] = 3] = "Push";
    })(InputMode = gamecontrollerizer.InputMode || (gamecontrollerizer.InputMode = {}));
    var ButtonInputMode;
    (function (ButtonInputMode) {
        //% block="Hold"
        ButtonInputMode[ButtonInputMode["Hold"] = 0] = "Hold";
        //% block="Push"
        ButtonInputMode[ButtonInputMode["Push"] = 1] = "Push";
        //% block="Release"
        ButtonInputMode[ButtonInputMode["Release"] = 2] = "Release";
    })(ButtonInputMode = gamecontrollerizer.ButtonInputMode || (gamecontrollerizer.ButtonInputMode = {}));
    var GamepadDpad;
    (function (GamepadDpad) {
        //% block="⬋ LB"
        GamepadDpad[GamepadDpad["LeftBottom"] = 1] = "LeftBottom";
        //% block="⬇ BT"
        GamepadDpad[GamepadDpad["Bottom"] = 2] = "Bottom";
        //% block="⬊ RB"
        GamepadDpad[GamepadDpad["RightButtom"] = 3] = "RightButtom";
        //% block="⬅ LM"
        GamepadDpad[GamepadDpad["LeftMiddle"] = 4] = "LeftMiddle";
        //% block="●  N"
        GamepadDpad[GamepadDpad["Neutral"] = 5] = "Neutral";
        //% block="➡ RM"
        GamepadDpad[GamepadDpad["RightMiddle"] = 6] = "RightMiddle";
        //% block="⬉ LT"
        GamepadDpad[GamepadDpad["LeftTop"] = 7] = "LeftTop";
        //% block="⬆ TP"
        GamepadDpad[GamepadDpad["Top"] = 8] = "Top";
        //% block="⬈ RT"
        GamepadDpad[GamepadDpad["RightTop"] = 9] = "RightTop";
    })(GamepadDpad = gamecontrollerizer.GamepadDpad || (gamecontrollerizer.GamepadDpad = {}));
    var GamepadButton;
    (function (GamepadButton) {
        //% block="Button-0"
        GamepadButton[GamepadButton["B0"] = 0] = "B0";
        //% block="Button-1"
        GamepadButton[GamepadButton["B1"] = 1] = "B1";
        //% block="Button-2"
        GamepadButton[GamepadButton["B2"] = 2] = "B2";
        //% block="Button-3"
        GamepadButton[GamepadButton["B3"] = 3] = "B3";
        //% block="Button-4"
        GamepadButton[GamepadButton["B4"] = 4] = "B4";
        //% block="Button-5"
        GamepadButton[GamepadButton["B5"] = 5] = "B5";
        //% block="Button-6"
        GamepadButton[GamepadButton["B6"] = 6] = "B6";
        //% block="Button-7"
        GamepadButton[GamepadButton["B7"] = 7] = "B7";
        //% block="Button-8"
        GamepadButton[GamepadButton["B8"] = 8] = "B8";
        //% block="Button-9"
        GamepadButton[GamepadButton["B9"] = 9] = "B9";
        //% block="Button-10"
        GamepadButton[GamepadButton["B10"] = 10] = "B10";
        //% block="Button-11"
        GamepadButton[GamepadButton["B11"] = 11] = "B11";
        //% block="None"
        GamepadButton[GamepadButton["None"] = -1] = "None";
    })(GamepadButton = gamecontrollerizer.GamepadButton || (gamecontrollerizer.GamepadButton = {}));
    var GamepadStick;
    (function (GamepadStick) {
        //% block="Left stick"
        GamepadStick[GamepadStick["Left"] = 0] = "Left";
        //% block="Right stick"
        GamepadStick[GamepadStick["Right"] = 1] = "Right";
    })(GamepadStick = gamecontrollerizer.GamepadStick || (gamecontrollerizer.GamepadStick = {}));
    var GamepadStickAxis;
    (function (GamepadStickAxis) {
        GamepadStickAxis[GamepadStickAxis["x"] = 0] = "x";
        GamepadStickAxis[GamepadStickAxis["y"] = 1] = "y";
    })(GamepadStickAxis = gamecontrollerizer.GamepadStickAxis || (gamecontrollerizer.GamepadStickAxis = {}));
    var GroveConnector;
    (function (GroveConnector) {
        //% block="P0/P14"
        GroveConnector[GroveConnector["C1"] = 0] = "C1";
        //% block="P1/P15"
        GroveConnector[GroveConnector["C2"] = 1] = "C2";
        //% block="P2/P16"
        GroveConnector[GroveConnector["C3"] = 2] = "C3";
    })(GroveConnector = gamecontrollerizer.GroveConnector || (gamecontrollerizer.GroveConnector = {}));
    var ExButton;
    (function (ExButton) {
        //% block="B0"
        ExButton[ExButton["EB0"] = 240] = "EB0";
        //% block="B1"
        ExButton[ExButton["EB1"] = 241] = "EB1";
        //% block="B2"
        ExButton[ExButton["EB2"] = 242] = "EB2";
        //% block="B3"
        ExButton[ExButton["EB3"] = 243] = "EB3";
    })(ExButton = gamecontrollerizer.ExButton || (gamecontrollerizer.ExButton = {}));
    var InputConfigTarget;
    (function (InputConfigTarget) {
        //% block="DPAD"
        InputConfigTarget[InputConfigTarget["DPAD"] = 1] = "DPAD";
        //% block="Left stick"
        InputConfigTarget[InputConfigTarget["LeftStick"] = 2] = "LeftStick";
        //% block="Right stick"
        InputConfigTarget[InputConfigTarget["RightStick"] = 4] = "RightStick";
    })(InputConfigTarget = gamecontrollerizer.InputConfigTarget || (gamecontrollerizer.InputConfigTarget = {}));
    var InputConfigMap;
    (function (InputConfigMap) {
        //% block="normal"
        InputConfigMap[InputConfigMap["Normal"] = 0] = "Normal";
        //% block="reverse"
        InputConfigMap[InputConfigMap["Reverse"] = 1] = "Reverse";
        //% block="the other"
        InputConfigMap[InputConfigMap["Theother"] = 2] = "Theother";
    })(InputConfigMap = gamecontrollerizer.InputConfigMap || (gamecontrollerizer.InputConfigMap = {}));
    //////////////////////////////////////////////////////////////////////////////////////////
    // Commands
    //////////////////////////////////////////////////////////////////////////////////////////
    var Cmd = /** @class */ (function () {
        function Cmd() {
        }
        Cmd.prototype.toBytes = function () {
            return this.bytes;
        };
        return Cmd;
    }());
    /**
     * Cmd:0xC0
     */
    var DpadCmd = /** @class */ (function (_super) {
        __extends(DpadCmd, _super);
        /**
         *
         * @param dpad
         * @param dur
         */
        function DpadCmd(dpad, dur) {
            var _this = _super.call(this) || this;
            var tBuf = [0, 0, 0, 0];
            tBuf[0] = 0xC0;
            tBuf[1] = dur;
            tBuf[2] = dpad;
            _this.bytes = tBuf;
            return _this;
        }
        return DpadCmd;
    }(Cmd));
    gamecontrollerizer.DpadCmd = DpadCmd;
    // 
    /**
     * Cmd:0xC1
     */
    var ButtonCmd = /** @class */ (function (_super) {
        __extends(ButtonCmd, _super);
        /**
         *
         * @param buttons
         * @param dur
         */
        function ButtonCmd(buttons, dur) {
            var _this = _super.call(this) || this;
            var tBtn = 0x0000;
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i] == GamepadButton.None)
                    continue;
                tBtn |= (0x001 << buttons[i]);
            }
            var tBuf = [0, 0, 0, 0];
            tBuf[0] = 0xC1;
            tBuf[1] = dur;
            tBuf[2] = tBtn;
            tBuf[3] = tBtn >> 8;
            _this.bytes = tBuf;
            return _this;
        }
        return ButtonCmd;
    }(Cmd));
    gamecontrollerizer.ButtonCmd = ButtonCmd;
    /**
     * Cmd:0x02
     */
    var ButtonSetCmd = /** @class */ (function (_super) {
        __extends(ButtonSetCmd, _super);
        /**
         *
         * @param buttons
         * @param dur
         */
        function ButtonSetCmd(buttons, dur) {
            var _this = _super.call(this, buttons, dur) || this;
            _this.bytes[0] = 0xC2;
            return _this;
        }
        return ButtonSetCmd;
    }(ButtonCmd));
    gamecontrollerizer.ButtonSetCmd = ButtonSetCmd;
    /**
     * Cmd:0xC3
     */
    var ButtonUnsetCmd = /** @class */ (function (_super) {
        __extends(ButtonUnsetCmd, _super);
        /**
         *
         * @param buttons
         * @param dur
         */
        function ButtonUnsetCmd(buttons, dur) {
            var _this = _super.call(this, buttons, dur) || this;
            _this.bytes[0] = 0xC3;
            return _this;
        }
        return ButtonUnsetCmd;
    }(ButtonCmd));
    gamecontrollerizer.ButtonUnsetCmd = ButtonUnsetCmd;
    /**
     * Cmd:0xC4-7
     */
    var StickAxisCmd = /** @class */ (function (_super) {
        __extends(StickAxisCmd, _super);
        /**
         *
         * @param id
         * @param axis
         * @param value
         * @param dur
         */
        function StickAxisCmd(id, axis, value, dur) {
            var _this = _super.call(this) || this;
            var tCmd = 0xC4 | (id << 1) | axis;
            var tBuf = [0, 0, 0, 0];
            tBuf[0] = tCmd;
            tBuf[1] = dur;
            tBuf[2] = value;
            _this.bytes = tBuf;
            return _this;
        }
        return StickAxisCmd;
    }(Cmd));
    gamecontrollerizer.StickAxisCmd = StickAxisCmd;
    /**
     * Cmd:0xC8-9
     */
    var StickCmd = /** @class */ (function (_super) {
        __extends(StickCmd, _super);
        /**
         *
         * @param id
         * @param value_x
         * @param value_y
         * @param dur
         */
        function StickCmd(id, value_x, value_y, dur) {
            var _this = _super.call(this) || this;
            var tCmd = 0xC8 | id;
            var tBuf = [0, 0, 0, 0];
            tBuf[0] = tCmd;
            tBuf[1] = dur;
            tBuf[2] = value_x;
            tBuf[3] = value_y;
            _this.bytes = tBuf;
            return _this;
        }
        return StickCmd;
    }(Cmd));
    gamecontrollerizer.StickCmd = StickCmd;
    /**
     * Stick position
     */
    var StickPosition = /** @class */ (function () {
        /**
         *
         * @param x [-127:127]
         * @param y [-127:127]
         */
        function StickPosition(x, y) {
            this.x = x;
            this.y = y;
        }
        return StickPosition;
    }());
    gamecontrollerizer.StickPosition = StickPosition;
    /**
     * Cmd:0xCE
     */
    var InputConfigCmd = /** @class */ (function (_super) {
        __extends(InputConfigCmd, _super);
        /**
         * @param target
         * @param map
         */
        function InputConfigCmd(ctarget, cmap) {
            var _this = _super.call(this) || this;
            var tBuf = [0, 0, 0, 0];
            tBuf[0] = 0xCE;
            tBuf[1] = InputMode.Hold;
            tBuf[2] = ctarget;
            tBuf[3] = cmap;
            _this.bytes = tBuf;
            return _this;
        }
        return InputConfigCmd;
    }(Cmd));
    gamecontrollerizer.InputConfigCmd = InputConfigCmd;
    /**
     * Cmd:0xCF
     */
    var DurationCmd = /** @class */ (function (_super) {
        __extends(DurationCmd, _super);
        /**
         * @param dur
         */
        function DurationCmd(dur) {
            var _this = _super.call(this) || this;
            var tBuf = [0, 0, 0, 0];
            tBuf[0] = 0xCF;
            tBuf[1] = dur;
            _this.bytes = tBuf;
            return _this;
        }
        return DurationCmd;
    }(Cmd));
    gamecontrollerizer.DurationCmd = DurationCmd;
    //////////////////////////////////////////////////////////////////////////////////////////
    // Functions
    //////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Connect G.C. module
     * @param port
     */
    //% blockId="connectGc"
    //% block="[G.C.] Connect G.C. to Grove connector %cn"
    function connectGc(cn) {
        switch (cn) {
            case GroveConnector.C1:
                serial.redirect(SerialPin.P0, SerialPin.P14, BaudRate.BaudRate115200);
                break;
            case GroveConnector.C2:
                serial.redirect(SerialPin.P1, SerialPin.P15, BaudRate.BaudRate115200);
                break;
            case GroveConnector.C3:
                serial.redirect(SerialPin.P2, SerialPin.P16, BaudRate.BaudRate115200);
                break;
        }
        // event setting
        serial.onDataReceived('\n', function () {
            var tMsgId = 0xF0 | (serial.readBuffer(2)[0]);
            control.raiseEvent(EXTERNAL_BUTTON_EVENT_ID, tMsgId);
        });
    }
    gamecontrollerizer.connectGc = connectGc;
    /**
     * Send one command to G.C.
     * @param cmd
     */
    function sendToGc(cmd) {
        var tBuf = pins.createBufferFromArray(cmd.toBytes());
        serial.writeBuffer(tBuf);
    }
    gamecontrollerizer.sendToGc = sendToGc;
    //////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Operate Gamepad(digital)
     * @param dpad
     * @param button
     * @param mode
     */
    //% blockId="operateGamepadDigitally"
    //% block="[G.C.] %dpad| %button| %mode"
    function operateGamepadDigitally(dpad, button, mode) {
        if (dpad === void 0) { dpad = GamepadDpad.Neutral; }
        if (button === void 0) { button = GamepadButton.B0; }
        if (mode === void 0) { mode = InputMode.Hold; }
        var dur = mode;
        var tCmd0 = new DpadCmd(dpad, 0);
        var tCmd1 = new ButtonCmd([button], dur);
        sendToGc(tCmd0);
        sendToGc(tCmd1);
        return;
    }
    gamecontrollerizer.operateGamepadDigitally = operateGamepadDigitally;
    /**
     * Operate Gamepad(analog)
     * @param dpad
     * @param button
     * @param stick0
     * @param stick1
     * @param mode
     */
    //% blockId="operateGamepadAnalogly"
    //% block="[G.C.] %dpad| %button| %stick0| %stick1| %mode"
    function operateGamepadAnalogly(dpad, button, spos0, spos1, mode) {
        if (dpad === void 0) { dpad = GamepadDpad.Neutral; }
        if (button === void 0) { button = GamepadButton.B0; }
        if (spos0 === void 0) { spos0 = newStickPosition(); }
        if (spos1 === void 0) { spos1 = newStickPosition(); }
        if (mode === void 0) { mode = InputMode.Hold; }
        var dur = mode;
        var tCmd0 = new DpadCmd(dpad, 0);
        var tCmd1 = new ButtonCmd([button], 0);
        var tCmd2 = new StickCmd(GamepadStick.Left, spos0.x, spos0.y, 0);
        var tCmd3 = new StickCmd(GamepadStick.Right, spos1.x, spos1.y, dur);
        sendToGc(tCmd0);
        sendToGc(tCmd1);
        sendToGc(tCmd2);
        sendToGc(tCmd3);
        return;
    }
    gamecontrollerizer.operateGamepadAnalogly = operateGamepadAnalogly;
    //////////////////////////////////////////////////////////////////////////////////////////
    //% blockId="operateDpad"
    //% block="[G.C.] Change DPAD to %dpad|, then %mode"
    //% advanced=true
    function operateDpad(dpad, mode) {
        if (dpad === void 0) { dpad = GamepadDpad.Neutral; }
        if (mode === void 0) { mode = InputMode.Hold; }
        var dur = mode;
        var tCmd = new DpadCmd(dpad, dur);
        sendToGc(tCmd);
        return;
    }
    gamecontrollerizer.operateDpad = operateDpad;
    // blockId="operateButton"
    // block="[G.C.] Pick %button |, then %mode"
    // advanced=true
    function operateButton(button, mode) {
        if (button === void 0) { button = GamepadButton.B0; }
        if (mode === void 0) { mode = InputMode.Hold; }
        var dur = mode;
        var tCmd = new ButtonCmd([button], dur);
        sendToGc(tCmd);
        return;
    }
    gamecontrollerizer.operateButton = operateButton;
    //% blockId="operateButtonIndividually"
    //% block="[G.C.] Pick %button |, then %mode individually"
    //% advanced=true
    function operateButtonIndividually(button, mode) {
        if (button === void 0) { button = GamepadButton.B0; }
        if (mode === void 0) { mode = ButtonInputMode.Hold; }
        var tCmd;
        switch (mode) {
            case ButtonInputMode.Hold:
                tCmd = new ButtonSetCmd([button], InputMode.Hold);
                break;
            case ButtonInputMode.Push:
                tCmd = new ButtonSetCmd([button], InputMode.Push);
                break;
            case ButtonInputMode.Release:
                tCmd = new ButtonUnsetCmd([button], InputMode.Hold);
                break;
        }
        sendToGc(tCmd);
        return;
    }
    gamecontrollerizer.operateButtonIndividually = operateButtonIndividually;
    //% blockId="operateStick"
    //% block="[G.C.] Change %stick to %spos |,then %mode"
    //% advanced=true
    function operateStick(stick, spos, mode) {
        if (stick === void 0) { stick = GamepadStick.Left; }
        if (spos === void 0) { spos = newStickPosition(0, 0); }
        if (mode === void 0) { mode = InputMode.Hold; }
        var dur = mode;
        var tCmd = new StickCmd(stick, spos.x, spos.y, 0);
        sendToGc(tCmd);
        return;
    }
    gamecontrollerizer.operateStick = operateStick;
    /**
     * Create new Axis state
     * @param x [-127:127] value of X-axis
     * @param y [-127:127] value of Y-axis
     */
    //% blockId="newStickPosition"
    //% block="[G.C.] x %x |y %y"
    //% x.min=-127 x.max=127
    //% y.min=-127 y.max=127
    function newStickPosition(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return new StickPosition(x, y);
    }
    gamecontrollerizer.newStickPosition = newStickPosition;
    //% blockId="operateInputConfig"
    //% block="[G.C.] Config %ctarget |L-R input to %cmap |mode"
    //% advanced=true
    function operateInputConfig(ctarget, cmap) {
        if (ctarget === void 0) { ctarget = InputConfigTarget.DPAD; }
        if (cmap === void 0) { cmap = InputConfigMap.Normal; }
        var tCmd = new InputConfigCmd(ctarget, cmap);
        sendToGc(tCmd);
        return;
    }
    gamecontrollerizer.operateInputConfig = operateInputConfig;
    //% blockId="operateDuration"
    //% block="[G.C.] Wait %dur| frames"
    //% dur.min=1 dur.max=127
    function operateDuration(dur) {
        if (dur === void 0) { dur = 3; }
        var tCmd = new DurationCmd(dur);
        sendToGc(tCmd);
        return;
    }
    gamecontrollerizer.operateDuration = operateDuration;
    //////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Do something when a external button on G.C. module is pressed
     * @param id button id
     * @param handler code to run
     */
    //% blockId="onExternalButtonPressed"
    //% block="on %eb |is pressed"
    function onExternalButtonPressed(eb, handler) {
        if (eb === void 0) { eb = ExButton.EB0; }
        control.onEvent(EXTERNAL_BUTTON_EVENT_ID, eb, handler);
    }
    gamecontrollerizer.onExternalButtonPressed = onExternalButtonPressed;
})(gamecontrollerizer = exports.gamecontrollerizer || (exports.gamecontrollerizer = {}));

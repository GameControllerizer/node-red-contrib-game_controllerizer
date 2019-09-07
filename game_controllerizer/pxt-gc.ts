/**
 * Language references
 * https://makecode.com/blog/github-packages
 * https://makecode.com/language
 * https://makecode.microbit.org/blocks/custom
 */

import {PxtGcWrapper, PxtGcEnum} from "./pxt-gc_wrapper";

//% weight=100 color=#F1BC03 icon="\uf11b" block="GameControllerizer"
export namespace gamecontrollerizer {

    const wrapper_obj = new PxtGcWrapper();
    const serial = wrapper_obj
    const pins = wrapper_obj;
    const control = wrapper_obj;
    const BaudRate = PxtGcEnum;
    const SerialPin = PxtGcEnum;
    const Delimiters = PxtGcEnum;

    const EXTERNAL_BUTTON_EVENT_ID: number = 12345;

    //////////////////////////////////////////////////////////////////////////////////////////
    // Types
    //////////////////////////////////////////////////////////////////////////////////////////

    export enum InputMode {
        //% block="Hold"
        Hold = -1,
        //% block="Push"
        Push = 3
    }

    export enum ButtonInputMode {
        //% block="Hold"
        Hold,
        //% block="Push"
        Push,
        //% block="Release"
        Release,
    }

    export enum GamepadDpad {
        //% block="⬋ LB"
        LeftBottom = 1,
        //% block="⬇ BT"
        Bottom = 2,
        //% block="⬊ RB"
        RightButtom = 3,
        //% block="⬅ LM"
        LeftMiddle = 4,
        //% block="●  N"
        Neutral = 5,
        //% block="➡ RM"
        RightMiddle = 6,
        //% block="⬉ LT"
        LeftTop = 7,
        //% block="⬆ TP"
        Top = 8,
        //% block="⬈ RT"
        RightTop = 9
    }

    export enum GamepadButton {
        //% block="Button-0"
        B0 = 0,
        //% block="Button-1"
        B1 = 1,
        //% block="Button-2"
        B2 = 2,
        //% block="Button-3"
        B3 = 3,
        //% block="Button-4"
        B4 = 4,
        //% block="Button-5"
        B5 = 5,
        //% block="Button-6"
        B6 = 6,
        //% block="Button-7"
        B7 = 7,
        //% block="Button-8"
        B8 = 8,
        //% block="Button-9"
        B9 = 9,
        //% block="Button-10"
        B10 = 10,
        //% block="Button-11"
        B11 = 11,
        //% block="None"
        None = -1
    }

    export enum GamepadStick {
        //% block="Left stick"
        Left = 0,
        //% block="Right stick"
        Right = 1
    }
    export enum GamepadStickAxis {
        x = 0,
        y = 1
    }

    export enum GroveConnector {
        //% block="P0/P14"
        C1,
        //% block="P1/P15"
        C2,
        //% block="P2/P16"
        C3
    }

    export enum ExButton {
        //% block="B0"
        EB0 = 0x01,
        //% block="B1"
        EB1 = 0x02,
        //% block="B2"
        EB2 = 0x04,
        //% block="B3"
        EB3 = 0x08,
    }

    export enum InputConfigTarget {
        //% block="DPAD"
        DPAD = 0x01,
        //% block="Left stick"
        LeftStick = 0x02,
        //% block="Right stick"
        RightStick = 0x04
    }

    export enum InputConfigMap {
        //% block="normal"
        Normal = 0x00,
        //% block="reverse"
        Reverse = 0x01,
        //% block="the other"
        Theother = 0x02
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    // Commands
    //////////////////////////////////////////////////////////////////////////////////////////

    abstract class Cmd {
        protected dur: number;
        protected bytes: number[];
        constructor() { }
        toBytes(): number[] {
            return this.bytes;
        }
    }

    /**
     * Cmd:0xC0
     */
    export class DpadCmd extends Cmd {
        /**
         * 
         * @param dpad
         * @param dur
         */
        constructor(dpad: GamepadDpad, dur: number) {
            super();

            let tBuf: number[] = [0, 0, 0, 0];
            tBuf[0] = 0xC0;
            tBuf[1] = dur;
            tBuf[2] = dpad;

            this.bytes = tBuf;
        }
    }

    // 
    /**
     * Cmd:0xC1
     */
    export class ButtonCmd extends Cmd {
        /**
         * 
         * @param buttons 
         * @param dur
         */
        constructor(buttons: GamepadButton[], dur: number) {
            super();

            let tBtn: number = 0x0000;
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i] == GamepadButton.None)
                    continue;
                tBtn |= (0x001 << buttons[i]);
            }
            let tBuf: number[] = [0, 0, 0, 0];
            tBuf[0] = 0xC1;
            tBuf[1] = dur;
            tBuf[2] = tBtn;
            tBuf[3] = tBtn >> 8;

            this.bytes = tBuf;
        }
    }

    /**
     * Cmd:0x02
     */
    export class ButtonSetCmd extends ButtonCmd {
        /**
         * 
         * @param buttons
         * @param dur
         */
        constructor(buttons: GamepadButton[], dur: number) {
            super(buttons, dur);
            this.bytes[0] = 0xC2;
        }
    }

    /**
     * Cmd:0xC3
     */
    export class ButtonUnsetCmd extends ButtonCmd {
        /**
         * 
         * @param buttons 
         * @param dur
         */
        constructor(buttons: GamepadButton[], dur: number) {
            super(buttons, dur);
            this.bytes[0] = 0xC3;
        }
    }

    /**
     * Cmd:0xC4-7
     */
    export class StickAxisCmd extends Cmd {
        /**
         * 
         * @param id
         * @param axis
         * @param value
         * @param dur
         */
        constructor(id: GamepadStick, axis: GamepadStickAxis, value: number, dur: number) {
            super();
            let tCmd = 0xC4 | (id << 1) | axis;
            let tBuf: number[] = [0, 0, 0, 0];
            tBuf[0] = tCmd;
            tBuf[1] = dur;
            tBuf[2] = value;

            this.bytes = tBuf;
        }
    }

    /**
     * Cmd:0xC8-9
     */
    export class StickCmd extends Cmd {
        /**
         * 
         * @param id
         * @param value_x
         * @param value_y
         * @param dur
         */
        constructor(id: GamepadStick, value_x: number, value_y: number, dur: number) {
            super();
            let tCmd = 0xC8 | id;
            let tBuf: number[] = [0, 0, 0, 0];
            tBuf[0] = tCmd;
            tBuf[1] = dur;
            tBuf[2] = value_x;
            tBuf[3] = value_y;

            this.bytes = tBuf;
        }
    }

    /**
     * Stick position
     */
    export class StickPosition {
        x: number;
        y: number;
        /**
         * 
         * @param x [-127:127]
         * @param y [-127:127]
         */
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    /**
     * Cmd:0xCD
     */
    export class InterruptCmd extends Cmd {
        /**
         */
        constructor() {
            super();

            let tBuf: number[] = [0, 0, 0, 0];
            tBuf[0] = 0xCD;

            this.bytes = tBuf;
        }
    }

    /**
     * Cmd:0xCE
     */
    export class InputConfigCmd extends Cmd {
        /**
         * @param target
         * @param map
         */
        constructor(ctarget: InputConfigTarget, cmap: InputConfigMap) {
            super();

            let tBuf: number[] = [0, 0, 0, 0];
            tBuf[0] = 0xCE;
            tBuf[1] = InputMode.Hold;
            tBuf[2] = ctarget;
            tBuf[3] = cmap;

            this.bytes = tBuf;
        }
    }

    /**
     * Cmd:0xCF
     */
    export class DurationCmd extends Cmd {
        /**
         * @param dur
         */
        constructor(dur: number) {
            super();

            let tBuf: number[] = [0, 0, 0, 0];
            tBuf[0] = 0xCF;
            tBuf[1] = dur;

            this.bytes = tBuf;
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    // Functions
    //////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Connect G.C. module
     * @param port
     */
    //% blockId="connectGc"
    //% block="[G.C.] Connect G.C. to Grove connector %cn"
    export function connectGc(cn: GroveConnector): void {
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
        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
            let tMsgId: number = serial.readBuffer(2)[0];
            control.raiseEvent(EXTERNAL_BUTTON_EVENT_ID, tMsgId);
        })
    }

    /**
     * Send one command to G.C.
     * @param cmd
     */
    export function sendToGc(cmd: Cmd): void {
        const tBuf = pins.createBufferFromArray(cmd.toBytes());
        serial.writeBuffer(tBuf);
    }


    //////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Operate Gamepad(digital)
     * @param dpad
     * @param button
     * @param mode
     */
    //% blockId="operateGamepadDigitally"
    //% block="[G.C.] %dpad| %button| %mode"
    export function operateGamepadDigitally(
        dpad: GamepadDpad = GamepadDpad.Neutral,
        button: GamepadButton = GamepadButton.B0,
        mode: InputMode = InputMode.Hold): void {
        let dur = mode;
        let tCmd0 = new DpadCmd(dpad, 0);
        let tCmd1 = new ButtonCmd([button], dur);
        sendToGc(tCmd0);
        sendToGc(tCmd1);
        return;
    }

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
    export function operateGamepadAnalogly(
        dpad: GamepadDpad = GamepadDpad.Neutral,
        button: GamepadButton = GamepadButton.B0,
        spos0: StickPosition = newStickPosition(),
        spos1: StickPosition = newStickPosition(),
        mode: InputMode = InputMode.Hold): void {
        let dur = mode;
        let tCmd0 = new DpadCmd(dpad, 0);
        let tCmd1 = new ButtonCmd([button], 0);
        let tCmd2 = new StickCmd(GamepadStick.Left, spos0.x, spos0.y, 0);
        let tCmd3 = new StickCmd(GamepadStick.Right, spos1.x, spos1.y, dur);
        sendToGc(tCmd0);
        sendToGc(tCmd1);
        sendToGc(tCmd2);
        sendToGc(tCmd3);
        return;
    }


    //////////////////////////////////////////////////////////////////////////////////////////

    //% blockId="operateDpad"
    //% block="[G.C.] Change DPAD to %dpad|, then %mode"
    //% advanced=true
    export function operateDpad(
        dpad: GamepadDpad = GamepadDpad.Neutral,
        mode: InputMode = InputMode.Hold): void {
        let dur = mode;
        let tCmd = new DpadCmd(dpad, dur);
        sendToGc(tCmd);
        return;
    }

    // blockId="operateButton"
    // block="[G.C.] Pick %button |, then %mode"
    // advanced=true
    export function operateButton(
        button: GamepadButton = GamepadButton.B0,
        mode: InputMode = InputMode.Hold): void {
        let dur = mode;
        let tCmd = new ButtonCmd([button], dur);
        sendToGc(tCmd);
        return;
    }
    //% blockId="operateButtonIndividually"
    //% block="[G.C.] Pick %button |, then %mode individually"
    //% advanced=true
    export function operateButtonIndividually(
        button: GamepadButton = GamepadButton.B0,
        mode: ButtonInputMode = ButtonInputMode.Hold): void {
        let tCmd: Cmd;
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

    //% blockId="operateStick"
    //% block="[G.C.] Change %stick to %spos |,then %mode"
    //% advanced=true
    export function operateStick(
        stick: GamepadStick = GamepadStick.Left,
        spos: StickPosition = newStickPosition(0, 0),
        mode: InputMode = InputMode.Hold): void {
        let dur = mode;
        let tCmd = new StickCmd(stick, spos.x, spos.y, dur);
        sendToGc(tCmd);
        return;
    }

	/**
	 * Create new Axis state
	 * @param x [-127:127] value of X-axis
	 * @param y [-127:127] value of Y-axis
	 */
    //% blockId="newStickPosition"
    //% block="[G.C.] x %x |y %y"
    //% x.min=-127 x.max=127
    //% y.min=-127 y.max=127
    export function newStickPosition(x: number = 0, y: number = 0): StickPosition {
        return new StickPosition(x, y);
    }

    //% blockId="operateInterrupt"
    //% block="[G.C.] Interrupt command inputs"
    //% advanced=true
    export function operateInterrupt(): void {
        let tCmd = new InterruptCmd();
        sendToGc(tCmd);
        return;
    }

    //% blockId="operateInputConfig"
    //% block="[G.C.] Config %ctarget |L-R input to %cmap |mode"
    //% advanced=true
    export function operateInputConfig(
        ctarget: InputConfigTarget = InputConfigTarget.DPAD,
        cmap: InputConfigMap = InputConfigMap.Normal): void {
        let tCmd = new InputConfigCmd(ctarget, cmap);
        sendToGc(tCmd);
        return;
    }

    //% blockId="operateDuration"
    //% block="[G.C.] Wait %dur| frames"
    //% dur.min=1 dur.max=127
    export function operateDuration(dur: number = 3): void {
        let tCmd = new DurationCmd(dur);
        sendToGc(tCmd);
        return;
    }


    //////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Do something when a external button on G.C. module is pressed
     * @param id button id
     * @param handler code to run
     */
    //% blockId="onExternalButtonPressed"
    //% block="on %eb |is pressed"
    export function onExternalButtonPressed(eb: ExButton = ExButton.EB0, handler: () => void) {
        control.onEvent(EXTERNAL_BUTTON_EVENT_ID, eb, handler);
    }

}

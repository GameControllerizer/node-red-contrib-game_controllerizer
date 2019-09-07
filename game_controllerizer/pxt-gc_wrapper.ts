declare const Buffer;

export class PxtGcWrapper{
	
	// serial.writeBuffer
	writeBuffer(a0) {
	}
	// serial.redirect
	redirect(a0,a1,a2){
	}
	// serial.readBuffer
	readBuffer(a0){
	}
	// serial.onDataReceived
	onDataReceived(a0, f0){
	}
	// serial.delimiter
	delimiters(a0){		
	}

	// control.raiseEvent
	raiseEvent(a0, a1){}
	// control.onEvent
	onEvent(a0, a1, a2){}

	// pins.createBufferFromArray
	createBufferFromArray(a0){
		return Buffer.from(a0);
	}	
}

export enum PxtGcEnum {
	P0, P1, P2, P14, P15, P16,
	BaudRate115200,
	NewLine
}

